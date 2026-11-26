import Link from 'next/link';
import { requireMember } from '@/lib/auth';
import { CATEGORIES, formatPrice } from '@/lib/config';
import { deleteListing, setListingArchived } from '@/lib/actions/member';

export const metadata = { title: 'My listings' };

export default async function MyListings({ searchParams }) {
  const sp = await searchParams;
  const { supabase, user } = await requireMember('/member/listings');
  const { data: listings } = await supabase.from('listings').select('*').eq('seller_id', user.id).order('created_at', { ascending: false });
  return (
    <>
      <div className="page-head">
        <div><div className="kicker">Sell</div><h1>My listings</h1></div>
        <Link className="btn dark" href="/member/listings/new">Create a listing</Link>
      </div>
      {sp?.saved && <div className="alert ok">Saved and submitted for review. You'll see it go live here once approved.</div>}
      {listings?.length ? (
        <table className="t">
          <thead><tr><th>Listing</th><th>Category</th><th>Price</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id}>
                <td>
                  <Link href={`/member/marketplace/${l.id}`}><strong>{l.title}</strong></Link>
                  {l.status === 'rejected' && l.review_note && <div className="small" style={{ color: '#8a2f20' }}>Reviewer: {l.review_note}</div>}
                </td>
                <td>{CATEGORIES[l.category]}</td>
                <td>{formatPrice(l)}</td>
                <td><span className={`status ${l.status}`}>{l.status}</span></td>
                <td>
                  <div className="actions">
                    <Link className="btn sm outline" href={`/member/listings/${l.id}`}>Edit</Link>
                    <form action={setListingArchived}>
                      <input type="hidden" name="id" value={l.id} />
                      <input type="hidden" name="archive" value={l.status === 'archived' ? '0' : '1'} />
                      <button className="btn sm outline" type="submit">{l.status === 'archived' ? 'Resubmit' : 'Archive'}</button>
                    </form>
                    <form action={deleteListing}>
                      <input type="hidden" name="id" value={l.id} />
                      <button className="btn sm outline" type="submit">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty">
          <h3>You haven't listed anything yet.</h3>
          <p>Sell services, delivery capacity, playbooks or a niche CORE to other members.</p>
          <p style={{ marginTop: 14 }}><Link className="btn dark" href="/member/listings/new">Create your first listing</Link></p>
        </div>
      )}
    </>
  );
}
