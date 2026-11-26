// Central configuration: what yorCMO sells, marketplace categories, env checks.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

// What yorCMO sells to members. Each maps to a recurring Stripe Price via env.
export const OFFERINGS = {
  membership: {
    key: 'membership',
    name: 'Alliance membership',
    price: '$350',
    unit: '/ month per person',
    priceEnv: 'STRIPE_PRICE_MEMBERSHIP',
    summary: 'Everything in the Alliance: certification, Cobbler, tools, community, and the member marketplace.',
  },
  core_wholesale: {
    key: 'core_wholesale',
    name: 'CORE Wholesale',
    price: '$1,500',
    unit: '/ month',
    priceEnv: 'STRIPE_PRICE_CORE_WHOLESALE',
    summary: 'A customizable wholesale CORE, the marketing operating system, to run with your clients. Mark it up as you like. No commission.',
  },
  back_office: {
    key: 'back_office',
    name: 'Back office support',
    price: '$500',
    unit: '/ month per firm',
    priceEnv: 'STRIPE_PRICE_BACK_OFFICE',
    summary: 'Finance, invoicing and collections, payouts, QuickBooks bookkeeping, contracts, proposal and SOW support, Microsoft 365 with IT, scheduling, scorecards and CRM.',
  },
  concierge: {
    key: 'concierge',
    name: 'Concierge',
    price: '$500',
    unit: '/ month for 10 hours',
    priceEnv: 'STRIPE_PRICE_CONCIERGE',
    summary: 'Hands-on help at $50 an hour, no rollover: coordinator support, follow-up, scorecards and notes, campaign execution, content, research and admin.',
  },
};

export const ADD_ONS = ['core_wholesale', 'back_office', 'concierge'];

export function priceIdFor(key) {
  const o = OFFERINGS[key];
  return o ? process.env[o.priceEnv] || null : null;
}

export function offeringForPrice(priceId) {
  return Object.values(OFFERINGS).find((o) => process.env[o.priceEnv] === priceId) || null;
}

export const MEMBERSHIP_INCLUDES = [
  'Self-paced, online certification in the 6 Fundamentals of Marketing',
  'Cobbler™, the practice workspace that does for your firm what CORE does for clients',
  'Select tech, including Microsoft Teams and GoHighLevel',
  'A seat in the Foundation First book campaign',
  'Private member community',
  'Strategy office hours',
  'Monthly research and playbook drop',
  'Expert roundtables and handpicked introductions, as available',
  'Brand templates',
  'Your CMO profile in the member directory',
  'Selling and buying in the member marketplace',
  'Onboarding',
];

export const CATEGORIES = {
  service: 'Service',
  capacity: 'Delivery capacity',
  core: 'Niche CORE',
  ip: 'Playbook / IP',
  product: 'Product or template',
  other: 'Other',
};

export const PRICING_MODELS = {
  fixed: 'Fixed price',
  monthly: 'Per month',
  hourly: 'Per hour',
  quote: 'Request a quote',
};

export function formatPrice(listing) {
  if (listing.pricing_model === 'quote' || listing.price_cents == null) return 'Request a quote';
  const dollars = (listing.price_cents / 100).toLocaleString('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: listing.price_cents % 100 ? 2 : 0,
  });
  return { fixed: dollars, monthly: `${dollars} / month`, hourly: `${dollars} / hour` }[listing.pricing_model] || dollars;
}

export const REFERRAL_TERMS = 'Suggested referral share between members: 20% in the first year, 10% after, agreed between you.';
