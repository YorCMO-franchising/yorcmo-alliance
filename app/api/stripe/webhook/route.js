import { NextResponse } from 'next/server';
import { stripe, membershipStatusFrom } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { offeringForPrice } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Stripe → Supabase: create the member's account on first payment and keep
// membership status in sync with their subscription.
export async function POST(request) {
  const body = await request.text();
  let event;
  try {
    event = stripe().webhooks.constructEvent(body, request.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Invalid signature: ${err.message}` }, { status: 400 });
  }

  const db = createAdminClient();
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await onCheckoutCompleted(db, event.data.object);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await onSubscription(db, event.data.object);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error('stripe webhook', event.type, err);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 }); // Stripe retries
  }
  return NextResponse.json({ received: true });
}

async function onCheckoutCompleted(db, session) {
  if (session.mode !== 'subscription' || !session.subscription) return;
  const email = (session.customer_details?.email || session.customer_email || '').toLowerCase();
  const profileId = session.client_reference_id || (await ensureUser(db, email, session.metadata || {}));
  if (!profileId) throw new Error('No profile for checkout ' + session.id);

  await db.from('profiles').update({ stripe_customer_id: session.customer }).eq('id', profileId).is('stripe_customer_id', null);

  const sub = await stripe().subscriptions.retrieve(session.subscription);
  await recordSubscription(db, sub, profileId);
}

async function onSubscription(db, sub) {
  let profileId = sub.metadata?.profile_id || null;
  if (!profileId) {
    const { data } = await db.from('profiles').select('id').eq('stripe_customer_id', sub.customer).maybeSingle();
    profileId = data?.id || null;
  }
  // A brand-new member's first subscription arrives before the account exists;
  // checkout.session.completed records it.
  if (!profileId) return;
  await recordSubscription(db, sub, profileId);
}

async function recordSubscription(db, sub, profileId) {
  const key = sub.metadata?.service_key || offeringForPrice(sub.items?.data?.[0]?.price?.id)?.key || 'unknown';
  const { error } = await db.from('member_services').upsert({
    stripe_subscription_id: sub.id,
    profile_id: profileId,
    service_key: key,
    status: sub.status,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;

  if (key === 'membership') {
    // A member can have old and new membership subscriptions; any live one counts.
    const { data: rows } = await db.from('member_services').select('status')
      .eq('profile_id', profileId).eq('service_key', 'membership');
    const statuses = (rows || []).map((r) => membershipStatusFrom(r.status));
    const status = statuses.includes('active') ? 'active' : statuses.includes('past_due') ? 'past_due' : 'canceled';
    const { error: e2 } = await db.from('profiles').update({ membership_status: status }).eq('id', profileId);
    if (e2) throw e2;
  }
}

// Create the auth user for a new member, or find the existing one.
async function ensureUser(db, email, meta) {
  if (!email) return null;
  const { data, error } = await db.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: meta.full_name || null, firm: meta.firm || null },
  });
  if (data?.user) return data.user.id;

  const { data: existing } = await db.from('profiles').select('id, full_name, firm').eq('email', email).maybeSingle();
  if (!existing) throw error || new Error('Could not create user ' + email);
  const patch = {};
  if (!existing.full_name && meta.full_name) patch.full_name = meta.full_name;
  if (!existing.firm && meta.firm) patch.firm = meta.firm;
  if (Object.keys(patch).length) await db.from('profiles').update(patch).eq('id', existing.id);
  return existing.id;
}
