'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { requireUser } from '@/lib/auth';
import { SITE_URL } from '@/lib/config';

// Stripe customer portal: update card, view invoices, cancel.
export async function openBillingPortal() {
  const { profile } = await requireUser('/account');
  if (!profile?.stripe_customer_id) redirect('/apply');
  const portal = await stripe().billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${SITE_URL}/account`,
  });
  redirect(portal.url);
}
