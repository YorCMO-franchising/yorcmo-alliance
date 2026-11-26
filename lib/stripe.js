import 'server-only';
import Stripe from 'stripe';

let client;
export function stripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set');
  client ||= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}

// Map a Stripe subscription status to our membership status.
export function membershipStatusFrom(stripeStatus) {
  if (stripeStatus === 'active' || stripeStatus === 'trialing') return 'active';
  if (stripeStatus === 'past_due' || stripeStatus === 'unpaid' || stripeStatus === 'incomplete') return 'past_due';
  return 'canceled';
}
