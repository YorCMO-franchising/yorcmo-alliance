/* yorCMO Alliance — site behavior */

/* Where form submissions go. Interim: forms open a pre-filled email.
   TODO: swap for a GoHighLevel / HubSpot form endpoint when chosen. */
const ALLIANCE_CONTACT_EMAIL = "joe@josephmarkfrost.com";

/* ---------- Mobile nav ---------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".menu-btn");
  if (!btn) return;
  const nav = document.querySelector("nav.main");
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", String(open));
});

/* ---------- Forms → pre-filled email ---------- */
function formToMail(form) {
  const subject = form.dataset.subject || "yorCMO Alliance inquiry";
  const lines = [];
  const data = new FormData(form);
  const seen = new Set();
  for (const [k] of data) {
    if (seen.has(k)) continue;
    seen.add(k);
    const v = data.getAll(k).filter(Boolean).join(", ");
    if (v) lines.push(`${k}: ${v}`);
  }
  return `mailto:${ALLIANCE_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

document.addEventListener("submit", (e) => {
  const form = e.target.closest("form.f");
  if (!form) return;
  e.preventDefault();
  if (!form.reportValidity()) return;
  window.location.href = formToMail(form);
  const msg = form.querySelector(".form-msg");
  if (msg) msg.textContent = "Opening your email app with your details filled in. Send it and we'll follow up.";
});

/* ---------- Marketplace ---------- */
(function marketplace() {
  const root = document.getElementById("marketplace");
  if (!root) return;

  const listings = window.ALLIANCE_LISTINGS || [];
  const directory = window.ALLIANCE_DIRECTORY || [];
  const grid = root.querySelector(".mk-grid");
  const search = root.querySelector("#mk-search");
  const tagSel = root.querySelector("#mk-tag");
  const statusSel = root.querySelector("#mk-status");
  const tabs = [...root.querySelectorAll(".mk-tabs button")];

  const params = new URLSearchParams(location.search);
  let cat = params.get("cat") || "all";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const statusLabel = { available: "Available", soon: "Coming soon", example: "Example" };

  // counts
  tabs.forEach((t) => {
    const c = t.dataset.cat;
    const n = c === "all" ? listings.length : c === "directory" ? directory.length : listings.filter((l) => l.cat === c).length;
    const span = document.createElement("span");
    span.className = "count";
    span.textContent = n;
    t.appendChild(span);
  });

  // tag options
  const tags = [...new Set(listings.flatMap((l) => l.tags || []).concat(directory.flatMap((d) => d.niche || [])))].sort();
  tags.forEach((t) => tagSel.insertAdjacentHTML("beforeend", `<option>${esc(t)}</option>`));

  function listingCard(l) {
    const cta = l.status === "example"
      ? `<a class="btn sm dark" href="#list" data-open="list-modal">List yours</a>`
      : `<button class="btn sm dark" data-open="info-modal" data-item="${esc(l.title)}">${l.status === "soon" ? "Join waitlist" : "Request info"}</button>`;
    return `<article class="card listing">
      <div class="top"><span class="type">${esc(l.type)}</span><span class="badge ${l.status === "available" ? "" : esc(l.status)}">${statusLabel[l.status] || ""}</span></div>
      <h3>${esc(l.title)}</h3>
      <p>${esc(l.desc)}</p>
      <div class="chips">${(l.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      <div class="terms">${esc(l.by)}${l.terms ? " · " + esc(l.terms) : ""}</div>
      <div class="meta"><span class="lp">${esc(l.price)} <small>${esc(l.unit)}</small></span>${cta}</div>
    </article>`;
  }

  function personCard(p) {
    const initials = p.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
    return `<article class="card listing">
      <div class="person"><div class="avatar">${esc(initials)}</div><div><h3>${esc(p.name)}</h3><div class="muted small">${esc(p.firm)} · ${esc(p.city || "")}</div></div></div>
      <p>${esc(p.bio)}</p>
      <div class="chips">${(p.niche || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}${p.fundamentalsCertified ? `<span class="chip">6 Fundamentals certified</span>` : ""}</div>
      <div class="meta"><span class="type">Operating CMO™</span><button class="btn sm dark" data-open="info-modal" data-item="Intro to ${esc(p.name)}">Request intro</button></div>
    </article>`;
  }

  function render() {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.cat === cat)));
    const q = search.value.trim().toLowerCase();
    const tag = tagSel.value;
    const st = statusSel.value;

    if (cat === "directory") {
      statusSel.disabled = true;
      const people = directory.filter((p) =>
        (!tag || (p.niche || []).includes(tag)) &&
        (!q || [p.name, p.firm, p.bio, p.city, ...(p.niche || [])].join(" ").toLowerCase().includes(q)));
      grid.innerHTML = people.length ? people.map(personCard).join("") :
        `<div class="empty"><h3>The Operating CMO directory opens with founding members.</h3>
         <p>Every Alliance member gets a CMO profile and listing on the yorCMO website. Profiles go live as members opt in.</p>
         <p style="margin-top:16px"><a class="btn sm" href="membership.html#apply">Become a member</a></p></div>`;
      return;
    }
    statusSel.disabled = false;
    const items = listings.filter((l) =>
      (cat === "all" || l.cat === cat) &&
      (!tag || (l.tags || []).includes(tag)) &&
      (!st || l.status === st) &&
      (!q || [l.title, l.desc, l.type, l.by, l.terms, ...(l.tags || [])].join(" ").toLowerCase().includes(q)));
    grid.innerHTML = items.length ? items.map(listingCard).join("") :
      `<div class="empty">Nothing matches those filters yet. <a href="#" data-reset>Clear filters</a></div>`;
  }

  tabs.forEach((t) => t.addEventListener("click", () => {
    cat = t.dataset.cat;
    const u = new URL(location.href);
    cat === "all" ? u.searchParams.delete("cat") : u.searchParams.set("cat", cat);
    history.replaceState(null, "", u);
    render();
  }));
  [search, tagSel, statusSel].forEach((el) => el.addEventListener("input", render));
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-reset]")) {
      e.preventDefault();
      search.value = ""; tagSel.value = ""; statusSel.value = "";
      render();
    }
  });

  render();
})();

/* ---------- Modals ---------- */
document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  if (opener) {
    const dlg = document.getElementById(opener.dataset.open);
    if (dlg && dlg.showModal) {
      e.preventDefault();
      const item = dlg.querySelector('[name="Listing"]');
      if (item) item.value = opener.dataset.item || "";
      dlg.showModal();
    }
    return;
  }
  if (e.target.closest("dialog .x")) e.target.closest("dialog").close();
  if (e.target.tagName === "DIALOG") e.target.close();
});
