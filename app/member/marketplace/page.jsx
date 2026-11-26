import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import { requireMember } from '@/lib/auth';
import { CATEGORIES } from '@/lib/config';

export const metadata = { title: 'Marketplace' };

export default async function Browse({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === 'string' ? sp.q.trim().slice(0, 80) : '';
  const cat = CATEGORIES[sp?.cat] ? sp.cat : '';
  const { supabase } = await requireMember('/member/marketplace');
  let query = supabase.from('listings')
    .select('id, title, summary, category, pricing_model, price_cents, tags, seller:profiles!listings_seller_id_fkey(full_name, firm)')
    .eq('status', 'approved').order('created_at', { ascending: false }).limit(120);
  if (cat) query = query.eq('category', cat);
  if (q) {
    const safe = q.replace(/[%,()]/g, ' ');
    query = query.or(`title.ilike.%${safe}%,summary.ilike.%${safe}%,description.ilike.%${safe}%`);
  }
  const { data: listings, error } = await query;
  return (
    <>
      <div className="page-head">
        <div><div className="kicker">Member marketplace</div><h1>Marketplace</h1><p className="muted">Services, capacity, playbooks and products from other members.</p></div>
        <Link className="btn dark" href="/member/listings/new">Sell something</Link>
      </div>
      <form className="mk-tools" method="get">
        <input type="search" name="q" defaultValue={q} placeholder="Search listings…" aria-label="Search listings" />
        <select name="cat" defaultValue={cat} aria-label="Category">
          <option value="">All categories</option>
          {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <button className="btn dark" type="submit">Search</button>
      </form>
      {error && <div className="alert err">Could not load listings.</div>}
      <div className="mk-grid">
        {listings?.length ? listings.map((l) => <ListingCard key={l.id} l={l} />) : (
          <div className="empty">
            {q || cat ? <>Nothing matches. <Link href="/member/marketplace">Clear the search</Link>.</> : <>No listings yet. <Link href="/member/listings/new">Create the first one</Link>.</>}
          </div>
        )}
      </div>
    </>
  );
}
