'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { APPLICATION, SITE_URL, stripeConfigured, supabaseConfigured } from '@/lib/config';
import { DEMO } from '@/lib/demo';

const t = (fd, k, max = 200) => String(fd.get(k) || '').trim().slice(0, max);
const emailOk = (e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
const url = (v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v) || null;

// Save the application, then send the applicant to Stripe to pay the fee.
export async function submitApplication(_prev, fd) {
  const row = {
    full_name: t(fd, 'full_name', 120),
    email: t(fd, 'email').toLowerCase(),
    firm: t(fd, 'firm', 120) || null,
    role: t(fd, 'role', 80) || null,
    city: t(fd, 'city', 120) || null,
    website: url(t(fd, 'website', 300)),
    linkedin: url(t(fd, 'linkedin', 300)),
    years_experience: Number.parseInt(t(fd, 'years_experience', 3), 10),
    specialty: t(fd, 'specialty', 300) || null,
    work_samples: t(fd, 'work_samples', 2000) || null,
    ref1_name: t(fd, 'ref1_name', 120), ref1_email: t(fd, 'ref1_email').toLowerCase(), ref1_relationship: t(fd, 'ref1_relationship', 120) || null,
    ref2_name: t(fd, 'ref2_name', 120), ref2_email: t(fd, 'ref2_email').toLowerCase(), ref2_relationship: t(fd, 'ref2_relationship', 120) || null,
    goals: t(fd, 'goals', 3000) || null,
  };

  const errors = [];
  if (!row.full_name) errors.push('your name');
  if (!emailOk(row.email)) errors.push('a valid email');
  if (!row.role) errors.push('your role');
  if (!Number.isFinite(row.years_experience) || row.years_experience < 0 || row.years_experience > 60) errors.push('years of experience');
  if (!row.specialty) errors.push('your specialty');
  if (!row.work_samples) errors.push('at least one work sample');
  if (!row.ref1_name || !emailOk(row.ref1_email) || !row.ref2_name || !emailOk(row.ref2_email)) errors.push('two references with names and emails');
  if (!row.goals) errors.push('what you want from the Alliance');
  if (errors.length) return { error: `Please add ${errors.join(', ')}.` };
  if (fd.get('agree') !== 'on') return { error: 'Please confirm you understand the application fee terms.' };
  if (fd.get('company')) return { error: 'Something went wrong. Please try again.' }; // honeypot

  if (DEMO) redirect('/apply/submitted');
  if (!supabaseConfigured || !stripeConfigured || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'Applications are not open online yet. Please check back shortly.' };
  }

  const db = createAdminClient();
  const { data: existing } = await db.from('profiles').select('membership_status').eq('email', row.email).maybeSingle();
  if (existing?.membership_status === 'active') return { error: 'You are already a member. Sign in instead.' };

  const { data: app, error } = await db.from('applications').insert(row).select('id').single();
  if (error) return { error: 'We could not save your application. Please try again.' };

  const price = process.env[APPLICATION.priceEnv];
  const checkout = await stripe().checkout.sessions.create({
    mode: 'payment',
    customer_creation: 'always',
    customer_email: row.email,
    client_reference_id: app.id,
    line_items: [price
      ? { price, quantity: 1 }
      : { quantity: 1, price_data: { currency: 'usd', unit_amount: APPLICATION.feeCents, product_data: { name: 'yorCMO Alliance application fee' } } }],
    payment_intent_data: {
      // Keep the card on file so an accepted applicant's membership can start without re-entering it.
      setup_future_usage: 'off_session',
      description: 'yorCMO Alliance application fee (refunded if not accepted; covers first month if accepted)',
      metadata: { application_id: app.id },
    },
    metadata: { kind: 'application', application_id: app.id },
    success_url: `${SITE_URL}/apply/submitted?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/apply?canceled=1`,
  });
  redirect(checkout.url);
}
