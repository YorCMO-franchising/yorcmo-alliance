-- yorCMO Alliance — initial schema
-- Run in the Supabase SQL editor (or `supabase db push`).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles: one row per auth user. Membership fields are written only by the
-- Stripe webhook (service role) or by admins.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  firm text,
  title text,
  city text,
  niche text[] not null default '{}',
  bio text,
  website text,
  linkedin text,
  directory_visible boolean not null default true,
  role text not null default 'member' check (role in ('member', 'admin')),
  membership_status text not null default 'none'
    check (membership_status in ('none', 'active', 'past_due', 'canceled')),
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index profiles_email_idx on public.profiles (lower(email));

-- Create a profile whenever an auth user is created.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, firm)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'firm'
  )
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helpers used by policies (security definer so they can read profiles under RLS).
create function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create function public.is_active_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and (membership_status = 'active' or role = 'admin')
  );
$$;

-- ---------------------------------------------------------------------------
-- Marketplace listings: members sell products and services to each other.
-- New and edited listings go to 'pending' until an admin approves them.
-- ---------------------------------------------------------------------------
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 3 and 120),
  category text not null
    check (category in ('service', 'product', 'capacity', 'ip', 'other')),
  summary text not null check (char_length(summary) between 10 and 280),
  description text,
  pricing_model text not null default 'quote'
    check (pricing_model in ('fixed', 'monthly', 'hourly', 'quote')),
  price_cents integer check (price_cents is null or price_cents >= 0),
  tags text[] not null default '{}',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'archived')),
  review_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index listings_status_idx on public.listings (status, created_at desc);
create index listings_seller_idx on public.listings (seller_id);

-- Guard status changes: only admins approve/reject. Sellers may archive their
-- own listing; any content edit by a non-admin sends it back to review.
create function public.listings_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if public.is_admin() or auth.uid() is null then
    return new;  -- admins and the service role can do anything
  end if;
  if tg_op = 'INSERT' then
    new.status := 'pending';
    new.review_note := null;
    return new;
  end if;
  if new.status is distinct from old.status and new.status not in ('archived', 'pending') then
    raise exception 'Only admins can approve or reject listings';
  end if;
  if (new.title, new.category, new.summary, new.description, new.pricing_model,
      new.price_cents, new.tags)
     is distinct from
     (old.title, old.category, old.summary, old.description, old.pricing_model,
      old.price_cents, old.tags)
     and new.status <> 'archived' then
    new.status := 'pending';
  end if;
  new.review_note := old.review_note;
  return new;
end $$;

create trigger listings_guard
  before insert or update on public.listings
  for each row execute function public.listings_guard();

-- ---------------------------------------------------------------------------
-- Inquiries: a member contacts a seller about a listing.
-- ---------------------------------------------------------------------------
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  buyer_id uuid not null references public.profiles (id) on delete cascade,
  seller_id uuid not null references public.profiles (id) on delete cascade,
  buyer_name text,
  buyer_email text not null,
  message text not null check (char_length(message) between 5 and 4000),
  created_at timestamptz not null default now()
);
create index inquiries_seller_idx on public.inquiries (seller_id, created_at desc);
create index inquiries_buyer_idx on public.inquiries (buyer_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Membership subscriptions. Written only by the Stripe webhook.
-- ---------------------------------------------------------------------------
create table public.member_services (
  stripe_subscription_id text primary key,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  service_key text not null,
  status text not null,
  updated_at timestamptz not null default now()
);
create index member_services_profile_idx on public.member_services (profile_id);

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.inquiries enable row level security;
alter table public.member_services enable row level security;

-- Profiles: you see yourself; active members see other active members who
-- are listed in the directory; admins see everyone.
create policy profiles_select on public.profiles for select to authenticated
  using (
    id = auth.uid()
    or public.is_admin()
    or (public.is_active_member() and membership_status = 'active' and directory_visible)
  );
create policy profiles_update_self on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- Members can only edit their own descriptive fields; membership, role and
-- billing columns are off-limits to the authenticated role.
revoke update on public.profiles from authenticated;
grant update (full_name, firm, title, city, niche, bio, website, linkedin, directory_visible)
  on public.profiles to authenticated;

-- Listings
create policy listings_select on public.listings for select to authenticated
  using (
    seller_id = auth.uid()
    or public.is_admin()
    or (status = 'approved' and public.is_active_member())
  );
create policy listings_insert on public.listings for insert to authenticated
  with check (seller_id = auth.uid() and public.is_active_member());
create policy listings_update on public.listings for update to authenticated
  using (seller_id = auth.uid() or public.is_admin())
  with check (seller_id = auth.uid() or public.is_admin());
create policy listings_delete on public.listings for delete to authenticated
  using (seller_id = auth.uid() or public.is_admin());

-- Inquiries
create policy inquiries_select on public.inquiries for select to authenticated
  using (buyer_id = auth.uid() or seller_id = auth.uid() or public.is_admin());
create policy inquiries_insert on public.inquiries for insert to authenticated
  with check (
    buyer_id = auth.uid()
    and lower(buyer_email) = lower(auth.jwt() ->> 'email')
    and public.is_active_member()
    and exists (
      select 1 from public.listings l
      where l.id = listing_id and l.seller_id = inquiries.seller_id
        and l.status = 'approved' and l.seller_id <> auth.uid()
    )
  );

-- Member services: read your own.
create policy member_services_select on public.member_services for select to authenticated
  using (profile_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- "Talk to us first" requests from prospective members. Anyone can submit;
-- only admins can read.
-- ---------------------------------------------------------------------------
create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  firm text check (char_length(firm) <= 120),
  role text check (char_length(role) <= 80),
  message text check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);
alter table public.contact_requests enable row level security;
grant insert on public.contact_requests to anon, authenticated;
create policy contact_requests_insert on public.contact_requests for insert to anon, authenticated
  with check (true);
create policy contact_requests_admin_read on public.contact_requests for select to authenticated
  using (public.is_admin());
