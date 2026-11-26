# yorCMO Alliance

The website and member marketplace for the yorCMO Alliance, founded by Joe Frost.

- **Public site:** home, our story, membership, marketplace overview, Operating CMO.
- **Join and pay:** `/join` → Stripe Checkout ($350/month subscription) → account created automatically → sign in by email link.
- **Member area (`/member`):** dashboard, member marketplace (members sell to each other), my listings, inbox, member directory, profile, billing.
- **Admin:** listing review queue at `/member/admin`.

Built with Next.js 15 (App Router), Supabase (auth + Postgres with row level security) and Stripe (Checkout, Billing, customer portal). Deploys on Vercel.

## Setup

### 1. Supabase
1. Create a project at supabase.com.
2. SQL editor → run `supabase/migrations/0001_init.sql`.
3. Authentication → URL Configuration:
   - **Site URL:** your site, e.g. `https://alliance.yorcmo.com`
   - **Redirect URLs:** add `https://<your-site>/auth/callback` (and your `*.vercel.app` URL while testing).
4. Authentication → SMTP: connect your own email sender before launch. Supabase's built-in sender is rate-limited and meant for testing.
5. Copy the project URL, anon key and service role key from Project Settings → API.

### 2. Stripe
1. Products → create **Alliance membership** with a $350 **monthly recurring** price. Copy its `price_...` ID.
2. Developers → Webhooks → add endpoint `https://<your-site>/api/stripe/webhook` with events:
   `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
   Copy the signing secret (`whsec_...`).
3. Settings → Billing → Customer portal: turn it on (update payment method, invoices, cancel).

### 3. Vercel
Import the repo (framework: Next.js), add every variable from `.env.example`, and deploy.
Use Stripe **test mode** keys first; switch to live keys when ready.

### 4. Make yourself an admin
After you've signed in once, run in the Supabase SQL editor:
```sql
update public.profiles set role = 'admin' where email = 'you@example.com';
```
Admins get the member area without a membership and see **Review listings**.

## Local development
```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev
```
Forward Stripe webhooks locally with the Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Tests
`supabase/tests/rls_test.sql` checks the access rules (who can see, edit and approve what) against a scratch Postgres with a stand-in for Supabase auth:
```bash
psql -d scratch -v ON_ERROR_STOP=1 -f supabase/tests/supabase_stub.sql \
  -f supabase/migrations/0001_init.sql -f supabase/tests/rls_test.sql
```

## Static preview (GitHub Pages)
`main` holds a click-through preview with fictional sample data, served by GitHub Pages.
`DEMO_MODE=1` fills the app with sample data and signs requests in as a sample admin when the `demo=member` cookie is set. **Never set it in production.**
To regenerate the preview:
```bash
DEMO_MODE=1 STRIPE_SECRET_KEY=sk_test_demo STRIPE_PRICE_MEMBERSHIP=price_demo npm run build
DEMO_MODE=1 STRIPE_SECRET_KEY=sk_test_demo STRIPE_PRICE_MEMBERSHIP=price_demo npx next start -p 3100 &
NODE_PATH=$(npm root -g) node scripts/snapshot.mjs http://localhost:3100 ./preview-out /yorcmo-alliance/
```
Then replace the contents of `main` with `./preview-out`.

## Where things live
- Price, what's included, listing categories: `lib/config.js`
- Founder details and photo: `lib/founder.js`
- Stripe checkout and billing portal: `lib/actions/billing.js`
- Stripe → database sync: `app/api/stripe/webhook/route.js`
- Database schema and access rules: `supabase/migrations/0001_init.sql`
- Sample data for the preview: `lib/demo.js`
