import Link from 'next/link';
import { requireMember } from '@/lib/auth';

export const metadata = { title: 'Inbox' };

const when = (d) => new Date(d).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

export default async function Inbox() {
  const { supabase, user } = await requireMember('/member/inbox');
  const { data: rows } = await supabase.from('inquiries')
    .select('id, message, created_at, buyer_id, seller_id, buyer_name, buyer_email, listing:listings(id, title)')
    .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
    .order('created_at', { ascending: false }).limit(200);
  const received = (rows || []).filter((r) => r.seller_id === user.id);
  const sent = (rows || []).filter((r) => r.buyer_id === user.id);
  return (
    <>
      <div className="page-head"><div><div className="kicker">Marketplace</div><h1>Inbox</h1><p className="muted">Reply by email. Inquiries include the buyer's address.</p></div></div>

      <h2 style={{ fontSize: 24 }}>Received ({received.length})</h2>
      {received.length ? received.map((r) => (
        <div className="inquiry" key={r.id}>
          <div className="who">{r.buyer_name || r.buyer_email} <span className="when">· {when(r.created_at)}</span></div>
          <div className="small">About <Link href={`/member/marketplace/${r.listing?.id}`}>{r.listing?.title || 'a listing'}</Link></div>
          <p>{r.message}</p>
          <p style={{ marginTop: 10 }}>
            <a className="btn sm dark" href={`mailto:${r.buyer_email}?subject=${encodeURIComponent('Re: ' + (r.listing?.title || 'your Alliance inquiry'))}`}>Reply by email</a>
          </p>
        </div>
      )) : <p className="muted" style={{ marginBottom: 26 }}>No inquiries yet.</p>}

      <h2 style={{ fontSize: 24, marginTop: 30 }}>Sent ({sent.length})</h2>
      {sent.length ? sent.map((r) => (
        <div className="inquiry" key={r.id}>
          <div className="who"><Link href={`/member/marketplace/${r.listing?.id}`}>{r.listing?.title || 'Listing'}</Link> <span className="when">· {when(r.created_at)}</span></div>
          <p>{r.message}</p>
        </div>
      )) : <p className="muted">You haven't contacted any sellers yet.</p>}
    </>
  );
}
