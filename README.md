# yorCMO Alliance website

Static site for the yorCMO Alliance and its marketplace (yorCMO 3.0). No build step: open `index.html` or serve the folder from any static host. Deployed on Vercel (`vercel.json`: clean URLs, so `/membership` serves `membership.html`).

## Pages
- `index.html` — Alliance home
- `membership.html` — membership details and application form
- `marketplace.html` — CORE editions, member IP, shared services, member benefits, Operating CMO directory
- `operating-cmo.html` — the Operating CMO category
- `book.html` — Foundation First and the 2027 yorCMO Summit

## Editing
- **Listings and directory:** `assets/marketplace-data.js` (field reference at the top of the file).
- **Form destination:** `ALLIANCE_CONTACT_EMAIL` at the top of `assets/alliance.js`. Forms currently open a pre-filled email; swap in a GoHighLevel/HubSpot endpoint when chosen.
- **Styles:** `assets/alliance.css`. Bump the `?v=` query on the stylesheet/script tags after changes to bust caches.

All pricing and terms reflect the yorCMO 3.0 working draft and are subject to counsel review and final written agreements.

## Static preview (GitHub Pages)
`DEMO_MODE=1` fills the app with fictional sample data and signs requests in as a sample admin when the `demo=member` cookie is set. Never set it in production.
To regenerate the click-through preview published on `main`:
```bash
DEMO_MODE=1 STRIPE_SECRET_KEY=sk_test_demo STRIPE_PRICE_MEMBERSHIP=price_demo npm run build
DEMO_MODE=1 STRIPE_SECRET_KEY=sk_test_demo STRIPE_PRICE_MEMBERSHIP=price_demo npx next start -p 3100 &
NODE_PATH=$(npm root -g) node scripts/snapshot.mjs http://localhost:3100 ./preview-out /yorcmo-alliance/
```
