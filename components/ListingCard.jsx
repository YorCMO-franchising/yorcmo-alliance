import Link from 'next/link';
import { CATEGORIES, formatPrice } from '@/lib/config';

export default function ListingCard({ l }) {
  return (
    <article className="card listing">
      <div className="top"><span className="type">{CATEGORIES[l.category] || l.category}</span></div>
      <h3><Link href={`/member/marketplace/${l.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{l.title}</Link></h3>
      <p>{l.summary}</p>
      {l.tags?.length > 0 && <div className="chips">{l.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>}
      <div className="terms">{l.seller?.full_name}{l.seller?.firm ? ` · ${l.seller.firm}` : ''}</div>
      <div className="meta">
        <span className="lp">{formatPrice(l)}</span>
        <Link className="btn sm dark" href={`/member/marketplace/${l.id}`}>View</Link>
      </div>
    </article>
  );
}
