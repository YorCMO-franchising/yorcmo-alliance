# yorCMO Alliance website

Static site for the yorCMO Alliance and its marketplace (yorCMO 3.0). No build step: open `index.html` or serve the folder from any static host.

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
