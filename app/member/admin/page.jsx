import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { CATEGORIES, formatPrice } from '@/lib/config';
import { reviewListing } from '@/lib/actions/member';

export const metadata = { title: 'Review listings' };

export default async function Admin() {
  const { supabase } = await requireAdmin();
  const [{ data: pending }, { count: members }, { count: live }] = await Promise.all([
    supabase.from('listings').select('*, seller:profiles!listings_seller_id_fkey(full_name, firm, email)')
      .eq('status', 'pending').order('updated_at', { ascending: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('membership_status', 'active'),
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
  ]);
  return (
    <>
      <div className="page-head"><div><div className="kicker">Admin</div><h1>Review listings</h1></div></div>
      <div className="stat-row">
        <div className="stat"><div className="n">{members || 0}</div><div className="l">Active members</div></div>
        <div className="stat"><div className="n">{live || 0}</div><div className="l">Live listings</div></div>
        <div className="stat"><div className="n">{pending?.length || 0}</div><div className="l">Waiting for review</div></div>
      </div>
      {pending?.length ? pending.map((l) => (
        <div className="card" key={l.id} style={{ marginBottom: 16 }}>
          <div className="top" style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <span className="type" style={{ color: 'var(--teal)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>{CATEGORIES[l.category]} · {formatPrice(l)}</span>
            <span className="small muted">{l.seller?.full_name} · {l.seller?.email}</span>
          </div>
          <h3 style={{ marginTop: 8 }}><Link href={`/member/marketplace/${l.id}`}>{l.title}</Link></h3>
          <p>{l.summary}</p>
          {l.description && <p className="small muted" style={{ whiteSpace: 'pre-wrap' }}>{l.description.slice(0, 600)}{l.description.length > 600 ? '…' : ''}</p>}
          <form action={reviewListing} className="f" style={{ marginTop: 14 }}>
            <input type="hidden" name="id" value={l.id} />
            <div><label htmlFor={`note-${l.id}`}>Note to seller <span className="muted">(shown if rejected)</span></label><input id={`note-${l.id}`} name="note" /></div>
            <div className="actions">
              <button className="btn sm dark" name="decision" value="approved" type="submit">Approve</button>
              <button className="btn sm outline" name="decision" value="rejected" type="submit">Reject</button>
            </div>
          </form>
        </div>
      )) : <div className="empty">Nothing waiting for review.</div>}
    </>
  );
}
