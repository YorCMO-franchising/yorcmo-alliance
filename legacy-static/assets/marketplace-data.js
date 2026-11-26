/* yorCMO Alliance Marketplace — listing data.
   Edit this file to add, change, or retire listings. No build step needed.

   Fields
     id        unique slug
     cat       "core" | "ip" | "services" | "member" | "directory"
     type      short label shown above the title
     title     listing name
     by        who offers it ("yorCMO", a member firm, etc.)
     desc      one or two sentences
     price     display price ("$1,500", "Market price", "Included", "TBD")
     unit      e.g. "/ month"
     terms     commission or terms line (optional)
     status    "available" | "soon" | "example"
     tags      array of filter tags (niche, function, etc.)
     audience  "members" | "clients" | "all"

   Status "example" = illustrative placeholder until real member listings are approved.
   All pricing is from the yorCMO 3.0 working draft (Nov 25, 2026) and is subject to final written terms. */

window.ALLIANCE_LISTINGS = [
  /* ---------- CORE editions ---------- */
  {
    id: "core-wholesale", cat: "core", type: "CORE · Wholesale",
    title: "CORE Wholesale",
    by: "yorCMO",
    desc: "A customizable wholesale CORE — the client's marketing operating system — to run with your own clients. Mark it up as you like.",
    price: "$1,500", unit: "/ month", terms: "Members only · No commission paid",
    status: "available", tags: ["Any niche", "Marketing OS"], audience: "members"
  },
  {
    id: "core-pro-services", cat: "core", type: "CORE · Market priced",
    title: "CORE for Professional Services",
    by: "yorCMO + build partner",
    desc: "A custom CORE edition tuned for professional-services firms, sold at market price.",
    price: "Market price", unit: "", terms: "20% commission to the selling member",
    status: "soon", tags: ["Professional services", "Marketing OS"], audience: "clients"
  },
  {
    id: "core-dentists", cat: "core", type: "CORE · Market priced",
    title: "CORE for Dentists",
    by: "yorCMO + build partner",
    desc: "A custom CORE edition for dental practices, sold at market price.",
    price: "Market price", unit: "", terms: "20% commission to the selling member",
    status: "soon", tags: ["Healthcare", "Dental", "Marketing OS"], audience: "clients"
  },
  {
    id: "core-lite", cat: "core", type: "CORE · Lite",
    title: "CORE Lite (do-it-yourself)",
    by: "yorCMO",
    desc: "A lite, do-it-yourself version of CORE for owners who take the do-it-yourself path in Foundation First.",
    price: "TBD", unit: "", terms: "Part of the Foundation First book campaign",
    status: "soon", tags: ["Owners", "Book campaign"], audience: "all"
  },
  {
    id: "core-build-partner", cat: "core", type: "CORE · Build partner",
    title: "Build a niche CORE with us",
    by: "You + the yorCMO AI team",
    desc: "Help build a custom CORE by CMO or by vertical, as equity in your own firm, and keep supporting it alongside the AI team.",
    price: "10%", unit: "commission", terms: "IP terms agreed in writing before the build starts",
    status: "available", tags: ["Any niche", "Build partner"], audience: "members"
  },

  /* ---------- Member IP ---------- */
  {
    id: "ip-example-vertical", cat: "ip", type: "Member IP · CORE add-on",
    title: "Vertical go-to-market playbook",
    by: "Example — your firm here",
    desc: "How a member listing will look: an Operating CMO customizes CORE with their own IP and sells it to clients and across the Alliance.",
    price: "Set by member", unit: "", terms: "Member keeps their IP · Marketplace terms in writing",
    status: "example", tags: ["Any niche", "Playbook"], audience: "all"
  },
  {
    id: "ip-example-workshop", cat: "ip", type: "Member IP · Workshop",
    title: "6 Fundamentals leadership workshop",
    by: "Example — your firm here",
    desc: "How a productized workshop offer will look: a repeatable session a member delivers or licenses to other members.",
    price: "Set by member", unit: "", terms: "Member keeps their IP",
    status: "example", tags: ["Workshop", "6 Fundamentals"], audience: "all"
  },

  /* ---------- Shared services ---------- */
  {
    id: "svc-back-office", cat: "services", type: "Shared service",
    title: "Back office support",
    by: "yorCMO flagship firm",
    desc: "Finance, invoicing and collections, CMO payouts, QuickBooks bookkeeping, contracts and agreements, proposal and scope-of-work support, Microsoft 365 with IT, tools and admin, scheduling, scorecards and CRM.",
    price: "$500", unit: "/ month per firm", terms: "Example pricing · Optional · Separately cancellable",
    status: "available", tags: ["Finance", "Admin", "Operations"], audience: "members"
  },
  {
    id: "svc-concierge", cat: "services", type: "Shared service",
    title: "Concierge",
    by: "yorCMO flagship firm",
    desc: "Hands-on help: coordinator support, follow-up, scorecards and notes, campaign execution, content, research, and admin. 10 hours at $50 an hour, no rollover.",
    price: "$500", unit: "/ month for 10 hrs", terms: "Example pricing · Optional · Separately cancellable",
    status: "available", tags: ["Delivery capacity", "Content", "Admin"], audience: "members"
  },
  {
    id: "svc-client-support", cat: "services", type: "Shared service",
    title: "Client support",
    by: "yorCMO flagship firm",
    desc: "Account management, client launch, and campaign and project coordination. If the work uses CORE, CORE terms apply.",
    price: "TBD", unit: "", terms: "Pricing not yet set",
    status: "soon", tags: ["Delivery capacity", "Account management"], audience: "members"
  },
  {
    id: "svc-niche-partnership", cat: "services", type: "Partnership",
    title: "Exclusive niche partnership",
    by: "Your firm + the flagship firm",
    desc: "Go after large-scale CORE users in your niche together. Mix and match shared services; terms fixed per partnership in its statement of work.",
    price: "Per SOW", unit: "", terms: "Terms agreed per partnership, in writing",
    status: "soon", tags: ["Any niche", "Partnership"], audience: "members"
  },

  /* ---------- Included with membership ---------- */
  {
    id: "mem-cobbler", cat: "member", type: "Included with membership",
    title: "Cobbler™ practice workspace",
    by: "yorCMO Alliance",
    desc: "The Alliance's CORE: it does for your practice what CORE does for clients. Try it on your own practice first.",
    price: "Included", unit: "", terms: "", status: "available", tags: ["Pipeline", "Practice ops"], audience: "members"
  },
  {
    id: "mem-certification", cat: "member", type: "Included with membership",
    title: "6 Fundamentals certification",
    by: "yorCMO Alliance",
    desc: "Self-paced, online certification in the 6 Fundamentals of Marketing — the system we've run for more than 100 companies since 2016.",
    price: "Included", unit: "", terms: "", status: "available", tags: ["6 Fundamentals", "Training"], audience: "members"
  },
  {
    id: "mem-research", cat: "member", type: "Included with membership",
    title: "Monthly research & playbook drop",
    by: "yorCMO Alliance",
    desc: "Shared insights members learn across the Alliance, packaged monthly. No client-identifying data.",
    price: "Included", unit: "", terms: "", status: "available", tags: ["Research", "Playbook"], audience: "members"
  },
  {
    id: "mem-tech", cat: "member", type: "Included with membership",
    title: "Select tech stack",
    by: "yorCMO Alliance",
    desc: "Select tools including Microsoft Teams and GoHighLevel (GHL).",
    price: "Included", unit: "", terms: "", status: "available", tags: ["Tech"], audience: "members"
  },
  {
    id: "mem-brand", cat: "member", type: "Included with membership",
    title: "Brand templates",
    by: "yorCMO Alliance",
    desc: "Ready-to-use brand templates for proposals, decks, and campaigns.",
    price: "Included", unit: "", terms: "", status: "available", tags: ["Brand"], audience: "members"
  },
  {
    id: "mem-roundtables", cat: "member", type: "Included with membership",
    title: "Expert roundtables & introductions",
    by: "yorCMO Alliance",
    desc: "Expert roundtables and handpicked introductions, as available, plus strategy office hours.",
    price: "Included", unit: "", terms: "", status: "available", tags: ["Community"], audience: "members"
  }
];

/* Operating CMO directory. Empty until members opt in to a public profile.
   Example shape:
   { name: "Jane Doe", firm: "Doe Growth", niche: ["Manufacturing"], city: "Dallas, TX",
     bio: "…", fundamentalsCertified: true, url: "https://…" } */
window.ALLIANCE_DIRECTORY = [];
