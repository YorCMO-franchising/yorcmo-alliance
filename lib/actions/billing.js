'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { getSession, isActive, requireUser } from '@/lib/auth';
import { SITE_URL, priceIdFor, stripeConfigured } from '@/lib/config';

const clean = (v, max = 120) => String(v || '').trim().slice(0, max);

// Join: start a Stripe Checkout subscription for Alliance membership.
export async function startMembershipCheckout(_prev, formData) {
  if (!stripeConfigured || !priceIdFor('membership')) {
    return { error: 'Online sign-up is not switched on yet. Please check back shortly.' };
  }
  const email = clean(formData.get('email'), 200).toLowerCase();
  const fullName = clean(formData.get('full_name'));
  const firm = clean(formData.get('firm'));
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Enter a valid email address.' };
  if (!fullName) return { error: 'Enter your name.' };
  if (formData.get('agree') !== 'on') return { error: 'Please accept the membership terms.' };

  const session = await getSession();
  if (session && isActive(session.profile)) redirect('/member');

  const meta = { service_key: 'membership', full_name: fullName, firm };
  const checkout = await stripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceIdFor('membership'), quantity: 1 }],
    ...(session?.profile?.stripe_customer_id
      ? { customer: session.profile.stripe_customer_id }
      : { customer_email: email }),
    ...(session ? { client_reference_id: session.user.id } : {}),
    metadata: meta,
    subscription_data: { metadata: { ...meta, ...(session ? { profile_id: session.user.id } : {}) } },
    allow_promotion_codes: true,
    success_url: `${SITE_URL}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/join?canceled=1`,
  });
  redirect(checkout.url);
}

// Stripe customer portal: update card, view invoices, cancel.
export async function openBillingPortal() {
  const { profile } = await requireUser('/account');
  if (!profile?.stripe_customer_id) redirect('/join');
  const portal = await stripe().billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${SITE_URL}/account`,
  });
  redirect(portal.url);
}
