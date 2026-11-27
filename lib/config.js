// Central configuration: what yorCMO sells, marketplace categories, env checks.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

// Optional booking link (Calendly, GoHighLevel calendar, etc.) for "Talk to us first".
export const CALL_URL = process.env.NEXT_PUBLIC_CALL_URL || null;

// What the Alliance sells. Each maps to a recurring Stripe Price via env.
export const OFFERINGS = {
  membership: {
    key: 'membership',
    name: 'Alliance membership',
    price: '$350',
    unit: '/ month per person',
    priceEnv: 'STRIPE_PRICE_MEMBERSHIP',
    summary: 'Everything in the Alliance: certification, Cobbler, tools, community, and the member marketplace.',
  },
};

export function priceIdFor(key) {
  const o = OFFERINGS[key];
  return o ? process.env[o.priceEnv] || null : null;
}

export function offeringForPrice(priceId) {
  return Object.values(OFFERINGS).find((o) => process.env[o.priceEnv] === priceId) || null;
}

// Applying: a refundable fee that becomes the first month if accepted.
export const APPLICATION = {
  feeCents: 35000,
  fee: '$350',
  decisionDays: 10,
  priceEnv: 'STRIPE_PRICE_APPLICATION', // optional one-time Price; falls back to an inline $350 price
};

export const VETTING_STEPS = [
  ['Apply', 'Tell us about your experience, specialty and goals, share work samples and two references, and pay the $350 application fee.'],
  ['Work review', 'The yorCMO team reviews your application and work samples.'],
  ['Interview', 'A 30-minute call about fit, values and what you want to build.'],
  ['References', 'We speak with the two client or peer references you provide.'],
  ['Decision', 'You hear from us within 10 business days. Accepted: your fee covers your first month. Not accepted: a full refund.'],
];

export const MEMBERSHIP_INCLUDES = [
  'Self-paced, online certification in the 6 Fundamentals of Marketing',
  'Cobbler™, the practice workspace for your pipeline, clients and delivery',
  'Select tech, including Microsoft Teams and GoHighLevel',
  'A seat in the Foundation First book campaign',
  'Private member community',
  'The FROST framework, created by founder Joe Frost, as your path from income to equity',
  'Strategy office hours',
  'Monthly research and playbook drop',
  'Expert roundtables and handpicked introductions, as available',
  'Brand templates',
  'Your profile in the member directory',
  'Selling and buying in the member marketplace',
  'Onboarding',
];

export const CATEGORIES = {
  service: 'Service',
  capacity: 'Delivery capacity',
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
