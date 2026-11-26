-- Local test of the schema and row level security, against a minimal stand-in
-- for Supabase's auth schema. Run against a scratch Postgres 15+ database:
--   psql -v ON_ERROR_STOP=1 -f supabase/tests/supabase_stub.sql \
--        -f supabase/migrations/0001_init.sql -f supabase/tests/rls_test.sql
-- Each check prints PASS or raises.

\set QUIET on
set client_min_messages = warning;

-- Act as a signed-in user (or the service role when uid is null).
create or replace function pg_temp.act_as(uid uuid, email text) returns void language plpgsql as $$
begin
  if uid is null then
    perform set_config('request.jwt.claims', '', false);
    perform set_config('role', 'postgres', false);
  else
    perform set_config('request.jwt.claims', json_build_object('sub', uid, 'email', email)::text, false);
    perform set_config('role', 'authenticated', false);
  end if;
end $$;

create or replace function pg_temp.check(ok boolean, label text) returns text language plpgsql as $$
begin
  if not ok then raise exception 'FAIL: %', label; end if;
  return 'PASS: ' || label;
end $$;

-- ---------- Fixtures (service role) ----------
select pg_temp.act_as(null, null);
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000000a', 'admin@example.com', '{"full_name":"Ada Admin"}'),
  ('00000000-0000-0000-0000-00000000000b', 'seller@example.com', '{"full_name":"Sam Seller","firm":"Seller Co"}'),
  ('00000000-0000-0000-0000-00000000000c', 'buyer@example.com', '{"full_name":"Bea Buyer"}'),
  ('00000000-0000-0000-0000-00000000000d', 'lapsed@example.com', '{}');

select pg_temp.check((select count(*) from public.profiles) = 4, 'trigger creates a profile per auth user');
select pg_temp.check((select firm from public.profiles where email = 'seller@example.com') = 'Seller Co', 'profile copies signup metadata');

update public.profiles set role = 'admin', membership_status = 'active' where email = 'admin@example.com';
update public.profiles set membership_status = 'active' where email in ('seller@example.com', 'buyer@example.com');
update public.profiles set membership_status = 'canceled' where email = 'lapsed@example.com';

-- ---------- Seller ----------
select pg_temp.act_as('00000000-0000-0000-0000-00000000000b', 'seller@example.com');

insert into public.listings (seller_id, title, category, summary, pricing_model, price_cents, status)
values ('00000000-0000-0000-0000-00000000000b', 'HubSpot setup', 'service', 'HubSpot implementation for services firms', 'fixed', 250000, 'approved');
select pg_temp.check((select status from public.listings where title = 'HubSpot setup') = 'pending',
  'seller cannot self-approve on insert (forced to pending)');

do $$ begin
  update public.listings set status = 'approved' where title = 'HubSpot setup';
  raise exception 'FAIL: seller approved own listing';
exception when raise_exception then
  if sqlerrm like 'FAIL%' then raise; end if;
end $$;
select 'PASS: seller cannot approve their own listing';

do $$ begin
  insert into public.listings (seller_id, title, category, summary)
  values ('00000000-0000-0000-0000-00000000000c', 'Spoofed', 'service', 'Listing under someone else');
  raise exception 'FAIL: inserted listing for another member';
exception when insufficient_privilege then null;
end $$;
select 'PASS: seller cannot create listings as another member';

do $$ begin
  update public.profiles set membership_status = 'active', role = 'admin' where id = auth.uid();
  raise exception 'FAIL: member changed own role/status';
exception when insufficient_privilege then null;
end $$;
select 'PASS: member cannot change own role or membership status';

update public.profiles set bio = 'I build HubSpot', niche = '{SaaS}' where id = auth.uid();
select pg_temp.check((select bio from public.profiles where id = auth.uid()) = 'I build HubSpot', 'member can edit own profile fields');

-- ---------- Buyer, before approval ----------
select pg_temp.act_as('00000000-0000-0000-0000-00000000000c', 'buyer@example.com');
select pg_temp.check((select count(*) from public.listings) = 0, 'pending listings hidden from other members');

-- ---------- Admin approves ----------
select pg_temp.act_as('00000000-0000-0000-0000-00000000000a', 'admin@example.com');
update public.listings set status = 'approved' where title = 'HubSpot setup';
select pg_temp.check((select status from public.listings where title = 'HubSpot setup') = 'approved', 'admin can approve');

-- ---------- Buyer, after approval ----------
select pg_temp.act_as('00000000-0000-0000-0000-00000000000c', 'buyer@example.com');
select pg_temp.check((select count(*) from public.listings) = 1, 'approved listing visible to active member');
select pg_temp.check((select count(*) from public.profiles where email = 'seller@example.com') = 1, 'active member sees other active members');
select pg_temp.check((select count(*) from public.profiles where email = 'lapsed@example.com') = 0, 'lapsed members hidden from directory');

insert into public.inquiries (listing_id, buyer_id, seller_id, buyer_email, buyer_name, message)
select id, '00000000-0000-0000-0000-00000000000c', seller_id, 'buyer@example.com', 'Bea Buyer', 'Can you start next week?'
from public.listings where title = 'HubSpot setup';
select 'PASS: active member can contact a seller';

do $$ begin
  insert into public.inquiries (listing_id, buyer_id, seller_id, buyer_email, message)
  select id, '00000000-0000-0000-0000-00000000000c', seller_id, 'someone-else@example.com', 'Spoofed reply-to'
  from public.listings where title = 'HubSpot setup';
  raise exception 'FAIL: inquiry with spoofed email accepted';
exception when insufficient_privilege then null;
end $$;
select 'PASS: inquiry email must be the buyer''s own';

do $$ begin
  update public.listings set summary = 'hijacked summary text' where title = 'HubSpot setup';
  if found then raise exception 'FAIL: buyer edited seller listing'; end if;
end $$;
select pg_temp.check((select summary from public.listings where title = 'HubSpot setup') <> 'hijacked summary text', 'members cannot edit others'' listings');

-- ---------- Seller sees inquiry; edit sends listing back to review ----------
select pg_temp.act_as('00000000-0000-0000-0000-00000000000b', 'seller@example.com');
select pg_temp.check((select count(*) from public.inquiries) = 1, 'seller sees inquiry');
update public.listings set summary = 'Updated HubSpot implementation offer' where title = 'HubSpot setup';
select pg_temp.check((select status from public.listings where title = 'HubSpot setup') = 'pending', 'editing a live listing resubmits it for review');
update public.listings set status = 'archived' where title = 'HubSpot setup';
select pg_temp.check((select status from public.listings where title = 'HubSpot setup') = 'archived', 'seller can archive own listing');

-- ---------- Lapsed member ----------
select pg_temp.act_as('00000000-0000-0000-0000-00000000000d', 'lapsed@example.com');
select pg_temp.check((select count(*) from public.profiles) = 1, 'lapsed member sees only themselves');
do $$ begin
  insert into public.listings (seller_id, title, category, summary)
  values ('00000000-0000-0000-0000-00000000000d', 'Lapsed listing', 'service', 'Should be refused here');
  raise exception 'FAIL: lapsed member created a listing';
exception when insufficient_privilege then null;
end $$;
select 'PASS: lapsed member cannot list';
select pg_temp.check((select count(*) from public.member_services) = 0, 'member_services readable only as own rows');

select pg_temp.act_as(null, null);
select 'ALL CHECKS PASSED';
