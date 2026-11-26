import Link from 'next/link';
import { notFound } from 'next/navigation';
import InquiryForm from '@/components/InquiryForm';
import { requireMember } from '@/lib/auth';
import { CATEGORIES, REFERRAL_TERMS, formatPrice } from '@/lib/config';

export default async function ListingDetail({ params }) {
  const { id } = await params;
  const { supabase, user } = await requireMember(`/member/marketplace/${id}`);
  const { data: l } = await supabase.from('listings')
    .select('*, seller:profiles!listings_seller_id_fkey(id, full_name, firm, title, city, bio, website, linkedin, niche)')
    .eq('id', id).maybeSingle();
  if (!l) notFound();
  const mine = l.seller_id === user.id;
  return (
    <>
      <p className="small"><Link href="/member/marketplace">← Marketplace</Link></p>
      <div className="split" style={{ marginTop: 14 }}>
        <div>
          <div className="kicker">{CATEGORIES[l.category]}</div>
          <h1>{l.title}</h1>
          <p className="lede" style={{ marginTop: 10 }}>{l.summary}</p>
          {l.description && <div className="prose">{l.description.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}</div>}
          {l.tags?.length > 0 && <div className="chips" style={{ marginTop: 18 }}>{l.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>}
        </div>
        <aside>
          <div className="card">
            <div className="price" style={{ fontSize: 34, color: 'var(--heading)' }}>{formatPrice(l)}</div>
            {mine ? (
              <>
                <p className="muted">This is your listing{l.status !== 'approved' ? ` (${l.status})` : ''}.</p>
                <Link className="btn outline block" href={`/member/listings/${l.id}`}>Edit listing</Link>
              </>
            ) : <InquiryForm listingId={l.id} />}
            <p className="small muted" style={{ marginTop: 14 }}>Scope and terms are agreed directly between buyer and seller. {REFERRAL_TERMS}</p>
          </div>
          {l.seller && (
            <div className="card" style={{ marginTop: 16 }}>
              <div className="person">
                <div className="avatar">{(l.seller.full_name || '?').split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}</div>
                <div><h3>{l.seller.full_name || 'Member'}</h3><div className="small muted">{[l.seller.title, l.seller.firm].filter(Boolean).join(', ')}</div></div>
              </div>
              {l.seller.bio && <p className="small">{l.seller.bio}</p>}
              <p className="small" style={{ marginTop: 8 }}><Link href={`/member/members#m-${l.seller.id}`}>View in directory →</Link></p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
