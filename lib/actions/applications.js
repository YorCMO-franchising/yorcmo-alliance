'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { priceIdFor } from '@/lib/config';
import { DEMO } from '@/lib/demo';

const PATH = '/member/admin/applications';
const done = (msg) => redirect(`${PATH}?msg=${encodeURIComponent(msg)}`);

async function load(id) {
  const db = createAdminClient();
  const { data: app } = await db.from('applications').select('*').eq('id', id).maybeSingle();
  return { db, app };
}

// Tick the vetting checklist and keep review notes.
export async function saveReview(fd) {
  const { supabase } = await requireAdmin();
  if (DEMO) done('Saved.');
  await supabase.from('applications').update({
    samples_reviewed: fd.get('samples_reviewed') === 'on',
    interview_done: fd.get('interview_done') === 'on',
    references_checked: fd.get('references_checked') === 'on',
    review_notes: String(fd.get('review_notes') || '').slice(0, 4000) || null,
    updated_at: new Date().toISOString(),
  }).eq('id', String(fd.get('id')));
  revalidatePath(PATH);
  done('Review saved.');
}

// Accept: create the member's account and start the membership. The paid
// application fee covers the first month, so billing begins one month from today.
export async function approveApplication(fd) {
  const { user: admin } = await requireAdmin();
  if (DEMO) done('Approved (preview only).');
  const { db, app } = await load(String(fd.get('id')));
  if (!app || app.status !== 'submitted') done('This application is not waiting for a decision.');
  if (!app.paid_at || !app.stripe_payment_intent) done('The application fee has not been paid.');
  if (!(app.samples_reviewed && app.interview_done && app.references_checked)) done('Finish the vetting checklist before approving.');
  const membershipPrice = priceIdFor('membership');
  if (!membershipPrice) done('Set STRIPE_PRICE_MEMBERSHIP before approving.');

  // 1. Account (created now, or found if they already signed in once).
  let profileId;
  const created = await db.auth.admin.createUser({ email: app.email, email_confirm: true, user_metadata: { full_name: app.full_name, firm: app.firm } });
  if (created.data?.user) profileId = created.data.user.id;
  else {
    const { data: p } = await db.from('profiles').select('id').eq('email', app.email).maybeSingle();
    if (!p) done('Could not create the member account. Try again.');
    profileId = p.id;
  }
  await db.from('profiles').update({
    full_name: app.full_name, firm: app.firm, title: app.role, city: app.city,
    website: app.website, linkedin: app.linkedin,
    niche: app.specialty ? app.specialty.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 12) : [],
    stripe_customer_id: app.stripe_customer_id,
  }).eq('id', profileId);

  // 2. Membership subscription on the card they paid with; first charge in one month.
  const { data: live } = await db.from('member_services').select('stripe_subscription_id')
    .eq('profile_id', profileId).eq('service_key', 'membership').in('status', ['active', 'trialing']);
  let sub = null;
  if (!live?.length) {
    const pi = await stripe().paymentIntents.retrieve(app.stripe_payment_intent);
    const pm = typeof pi.payment_method === 'string' ? pi.payment_method : pi.payment_method?.id;
    const firstBill = new Date();
    firstBill.setMonth(firstBill.getMonth() + 1);
    await stripe().customers.update(app.stripe_customer_id, { invoice_settings: { default_payment_method: pm } });
    sub = await stripe().subscriptions.create({
      customer: app.stripe_customer_id,
      items: [{ price: membershipPrice }],
      default_payment_method: pm,
      trial_end: Math.floor(firstBill.getTime() / 1000),
      metadata: { service_key: 'membership', profile_id: profileId, application_id: app.id },
    });
    await db.from('member_services').upsert({ stripe_subscription_id: sub.id, profile_id: profileId, service_key: 'membership', status: sub.status, updated_at: new Date().toISOString() });
  }
  await db.from('profiles').update({ membership_status: 'active' }).eq('id', profileId);

  // 3. Close out the application.
  await db.from('applications').update({ status: 'approved', decided_at: new Date().toISOString(), decided_by: admin.id, profile_id: profileId, updated_at: new Date().toISOString() }).eq('id', app.id);
  revalidatePath(PATH);
  done(`${app.full_name} approved. Membership is active; first charge in one month.`);
}

// Decline: refund the application fee in full.
export async function declineApplication(fd) {
  const { user: admin } = await requireAdmin();
  if (DEMO) done('Declined and refunded (preview only).');
  const { db, app } = await load(String(fd.get('id')));
  if (!app || app.status !== 'submitted') done('This application is not waiting for a decision.');
  if (app.stripe_payment_intent && !app.refunded_at) {
    await stripe().refunds.create({ payment_intent: app.stripe_payment_intent, reason: 'requested_by_customer', metadata: { application_id: app.id } });
  }
  await db.from('applications').update({
    status: 'declined', refunded_at: app.stripe_payment_intent ? new Date().toISOString() : null,
    decided_at: new Date().toISOString(), decided_by: admin.id, updated_at: new Date().toISOString(),
  }).eq('id', app.id);
  revalidatePath(PATH);
  done(`${app.full_name} declined. The $350 fee has been refunded.`);
}
