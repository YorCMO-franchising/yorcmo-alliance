import 'server-only';
import { cookies } from 'next/headers';

// DEMO MODE — only active when DEMO_MODE=1. Serves fictional sample data so the
// app can be previewed (and snapshotted to static pages) without Supabase.
// A request is "signed in" as the sample admin member when the cookie demo=member is set.

export const DEMO = process.env.DEMO_MODE === '1';

const day = (n) => new Date(Date.UTC(2026, 10, 26) - n * 86400000).toISOString();
const ME = 'd0000000-0000-0000-0000-000000000001';

const PROFILES = [
  { id: ME, email: 'alex@morgangrowth.example', full_name: 'Alex Morgan', firm: 'Morgan Growth Partners', title: 'Operating CMO', city: 'Dallas, TX', niche: ['Professional services', 'ABM'], bio: 'Operating CMO for professional-services firms between $5M and $50M. I install the 6 Fundamentals and run CORE weekly with leadership teams.', website: 'https://morgangrowth.example', linkedin: '', role: 'admin', membership_status: 'active', directory_visible: true, stripe_customer_id: 'cus_demo' },
  { id: 'd0000000-0000-0000-0000-000000000002', email: 'priya@northline.example', full_name: 'Priya Raman', firm: 'Northline Marketing', title: 'Operating CMO', city: 'Austin, TX', niche: ['SaaS', 'Product marketing'], bio: 'B2B SaaS go-to-market and positioning. Happy to take referrals for Series A–B software companies.', website: 'https://northline.example', linkedin: '', role: 'member', membership_status: 'active', directory_visible: true },
  { id: 'd0000000-0000-0000-0000-000000000003', email: 'marcus@forgecmo.example', full_name: 'Marcus Bell', firm: 'Forge CMO', title: 'Fractional CMO', city: 'Cleveland, OH', niche: ['Manufacturing', 'Distribution'], bio: 'Twenty years in industrial marketing. Built a niche CORE for manufacturers and looking for members to run it in other regions.', website: '', linkedin: '', role: 'member', membership_status: 'active', directory_visible: true },
  { id: 'd0000000-0000-0000-0000-000000000004', email: 'dana@brightsmile.example', full_name: 'Dana Whitfield', firm: 'Bright Practice Growth', title: 'Operating CMO', city: 'Phoenix, AZ', niche: ['Dental', 'Healthcare'], bio: 'Marketing leadership for multi-location dental groups and DSOs.', website: '', linkedin: '', role: 'member', membership_status: 'active', directory_visible: true },
  { id: 'd0000000-0000-0000-0000-000000000005', email: 'leo@ledgerlane.example', full_name: 'Leo Castillo', firm: 'Ledger Lane Studio', title: 'Content & SEO specialist', city: 'Denver, CO', niche: ['SEO', 'Content', 'AEO'], bio: 'White-label content and answer-engine optimization for Operating CMOs. Monthly retainers, delivered under your brand.', website: '', linkedin: '', role: 'member', membership_status: 'active', directory_visible: true },
  { id: 'd0000000-0000-0000-0000-000000000006', email: 'grace@opsbench.example', full_name: 'Grace Okafor', firm: 'OpsBench', title: 'Marketing operations', city: 'Atlanta, GA', niche: ['HubSpot', 'GoHighLevel', 'RevOps'], bio: 'CRM and automation builds. I take on implementation so you can stay in the strategy seat.', website: '', linkedin: '', role: 'member', membership_status: 'active', directory_visible: true },
];

const L = (id, seller, o) => ({ id: `e0000000-0000-0000-0000-00000000000${id}`, seller_id: seller, status: 'approved', description: null, tags: [], review_note: null, created_at: day(id), updated_at: day(id), ...o });
const P = (n) => PROFILES[n - 1].id;

const LISTINGS = [
  L(1, P(5), { title: 'White-label AEO & SEO content retainer', category: 'capacity', summary: 'Four answer-engine-optimized articles a month, written in your client\'s voice and delivered under your brand.', description: 'Includes topic research, briefs, drafts, one revision round and on-page SEO.\n\nTurnaround is two weeks from kickoff. Works with any CMS.', pricing_model: 'monthly', price_cents: 240000, tags: ['SEO', 'AEO', 'Content'] }),
  L(2, P(6), { title: 'HubSpot implementation for services firms', category: 'service', summary: 'Pipeline, lifecycle stages, lead scoring and reporting set up in four weeks. You stay the strategist; I build.', description: 'Fixed-scope build: portal audit, pipeline and lifecycle design, forms and workflows, scorecard dashboard, team training.\n\nI join your client meetings as part of your team.', pricing_model: 'fixed', price_cents: 650000, tags: ['HubSpot', 'RevOps'] }),
  L(3, P(3), { title: 'CORE for Manufacturers', category: 'core', summary: 'A niche CORE for industrial and manufacturing clients: distributor marketing, trade shows, RFQ pipeline and scorecards.', description: 'Built and supported by me with the yorCMO AI team. Run it with your manufacturing clients and I\'ll onboard you in two sessions.', pricing_model: 'quote', price_cents: null, tags: ['Manufacturing', 'CORE'] }),
  L(4, P(2), { title: 'Positioning sprint playbook', category: 'ip', summary: 'The two-week positioning sprint I run with SaaS leadership teams: agenda, worksheets, interview guide and final deck template.', pricing_model: 'fixed', price_cents: 120000, tags: ['SaaS', 'Positioning', 'Workshop'] }),
  L(5, P(4), { title: 'Dental group patient-acquisition audit', category: 'service', summary: 'A one-week audit of a dental group\'s local search, reviews, booking flow and paid media, with a 90-day plan.', pricing_model: 'fixed', price_cents: 300000, tags: ['Dental', 'Healthcare', 'Audit'] }),
  L(6, ME, { title: 'Fractional sales-and-marketing alignment workshop', category: 'ip', summary: 'Half-day workshop to align sales and marketing on ICP, stages and handoffs. Licensed with facilitator guide.', pricing_model: 'fixed', price_cents: 90000, tags: ['Workshop', '6 Fundamentals'] }),
  L(7, P(6), { title: 'GoHighLevel snapshot for Operating CMOs', category: 'product', summary: 'A ready-made GHL snapshot: pipelines, nurture sequences, referral-partner tracking and a weekly scorecard.', pricing_model: 'fixed', price_cents: 49700, tags: ['GoHighLevel', 'Template'] }),
  L(8, ME, { title: 'ABM program build for professional services', category: 'service', summary: 'Target-account program for firms selling six-figure engagements. Account lists, plays and reporting.', pricing_model: 'quote', price_cents: null, status: 'pending', tags: ['ABM'] }),
  L(9, P(5), { title: 'LinkedIn ghostwriting for founders', category: 'capacity', summary: 'Three founder posts a week in their voice, with a monthly content interview.', pricing_model: 'monthly', price_cents: 180000, status: 'pending', tags: ['LinkedIn', 'Content'] }),
];

const INQUIRIES = [
  { id: 'f0000000-0000-0000-0000-000000000001', listing_id: LISTINGS[5].id, buyer_id: P(2), seller_id: ME, buyer_name: 'Priya Raman', buyer_email: 'priya@northline.example', message: 'Could I license the alignment workshop for a SaaS client in January? Roughly 12 attendees.', created_at: day(1) },
  { id: 'f0000000-0000-0000-0000-000000000002', listing_id: LISTINGS[5].id, buyer_id: P(4), seller_id: ME, buyer_name: 'Dana Whitfield', buyer_email: 'dana@brightsmile.example', message: 'Interested for a DSO leadership offsite. Do you run it in person?', created_at: day(3) },
  { id: 'f0000000-0000-0000-0000-000000000003', listing_id: LISTINGS[1].id, buyer_id: ME, seller_id: P(6), buyer_name: 'Alex Morgan', buyer_email: 'alex@morgangrowth.example', message: 'I have a law-firm client who needs HubSpot rebuilt in Q1. Can we talk scope?', created_at: day(2) },
];

const SERVICES = [
  { stripe_subscription_id: 'sub_demo_1', profile_id: ME, service_key: 'membership', status: 'active' },
  { stripe_subscription_id: 'sub_demo_2', profile_id: ME, service_key: 'back_office', status: 'active' },
];

const TABLES = { profiles: PROFILES, listings: LISTINGS, inquiries: INQUIRIES, member_services: SERVICES };
const byId = (rows, id) => rows.find((r) => r.id === id) || null;

// Minimal, read-only imitation of the supabase-js query builder.
class Query {
  constructor(table) { this.table = table; this.filters = []; this.cols = '*'; this.head = false; this.countMode = null; }
  select(cols = '*', opts = {}) { this.cols = cols; this.head = !!opts.head; this.countMode = opts.count || null; return this; }
  eq(k, v) { this.filters.push((r) => r[k] === v); return this; }
  neq(k, v) { this.filters.push((r) => r[k] !== v); return this; }
  is(k, v) { this.filters.push((r) => (r[k] ?? null) === v); return this; }
  ilike(k, v) { const s = v.replace(/%/g, '').toLowerCase(); this.filters.push((r) => String(r[k] || '').toLowerCase().includes(s)); return this; }
  or(expr) {
    const parts = expr.split(',').map((p) => { const [k, op, ...rest] = p.split('.'); return { k, op, v: rest.join('.') }; });
    this.filters.push((r) => parts.some(({ k, op, v }) => op === 'eq' ? r[k] === v : String(r[k] || '').toLowerCase().includes(v.replace(/%/g, '').toLowerCase())));
    return this;
  }
  order(k, { ascending = true } = {}) { this.sort = { k, ascending }; return this; }
  limit(n) { this.max = n; return this; }
  single() { this.one = true; return this; }
  maybeSingle() { this.one = true; return this; }
  update() { this.write = true; return this; }
  insert() { this.write = true; return this; }
  upsert() { this.write = true; return this; }
  delete() { this.write = true; return this; }
  run() {
    if (this.write) return { data: null, error: null };
    let rows = (TABLES[this.table] || []).filter((r) => this.filters.every((f) => f(r)));
    if (this.sort) {
      const { k, ascending } = this.sort;
      rows = [...rows].sort((a, b) => (String(a[k] ?? '') < String(b[k] ?? '') ? -1 : 1) * (ascending ? 1 : -1));
    }
    if (this.max) rows = rows.slice(0, this.max);
    rows = rows.map((r) => this.join(r));
    const count = rows.length;
    if (this.head) return { data: null, count, error: null };
    if (this.one) return { data: rows[0] || null, error: null };
    return { data: rows, count, error: null };
  }
  join(r) {
    const out = { ...r };
    if (this.cols.includes('seller:')) out.seller = byId(PROFILES, r.seller_id);
    if (this.cols.includes('listing:')) out.listing = byId(LISTINGS, r.listing_id);
    return out;
  }
  then(resolve, reject) { try { resolve(this.run()); } catch (e) { reject(e); } }
}

export const demoClient = { from: (t) => new Query(t) };

export function demoCounts() {
  return {
    members: PROFILES.filter((p) => p.membership_status === 'active').length,
    listings: LISTINGS.filter((l) => l.status === 'approved').length,
  };
}

export async function demoSession() {
  const c = await cookies();
  if (c.get('demo')?.value !== 'member') return null;
  const profile = PROFILES[0];
  return { supabase: demoClient, user: { id: profile.id, email: profile.email }, profile };
}
