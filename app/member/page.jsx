import Link from 'next/link';
import { requireMember } from '@/lib/auth';
import { REFERRAL_TERMS } from '@/lib/config';

export const metadata = { title: 'Dashboard' };

export default async function Dashboard() {
  const { supabase, user, profile } = await requireMember('/member');
  const [{ count: live }, { count: pending }, { count: inbound }, { data: recent }] = await Promise.all([
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'approved'),
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'pending'),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('seller_id', user.id),
    supabase.from('listings').select('id, title, summary, category, created_at').eq('status', 'approved')
      .neq('seller_id', user.id).order('created_at', { ascending: false }).limit(5),
  ]);
  const incomplete = !profile.full_name || !profile.bio || !profile.niche?.length;
  return (
    <>
      <div className="page-head">
        <div>
          <div className="kicker">Member area</div>
          <h1>Welcome{profile.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}.</h1>
        </div>
        <Link className="btn dark" href="/member/listings/new">Create a listing</Link>
      </div>

      {incomplete && (
        <div className="alert info">Complete <Link href="/member/profile">your profile</Link> so other members can find you in the directory and know who they're buying from.</div>
      )}

      <div className="stat-row">
        <div className="stat"><div className="n">{live || 0}</div><div className="l">Your live listings</div></div>
        <div className="stat"><div className="n">{pending || 0}</div><div className="l">Waiting for review</div></div>
        <div className="stat"><div className="n">{inbound || 0}</div><div className="l">Inquiries received</div></div>
      </div>

      <div className="grid g2">
        <div className="card">
          <h3>New in the marketplace</h3>
          {recent?.length ? (
            <ul style={{ listStyle: 'none', marginTop: 8 }}>
              {recent.map((l) => (
                <li key={l.id} style={{ padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                  <Link href={`/member/marketplace/${l.id}`}><strong>{l.title}</strong></Link>
                  <div className="small muted">{l.summary}</div>
                </li>
              ))}
            </ul>
          ) : <p className="muted">No listings yet. Be the first: <Link href="/member/listings/new">create one</Link>.</p>}
          <p style={{ marginTop: 12 }}><Link href="/member/marketplace">Browse the marketplace →</Link></p>
        </div>
        <div className="grid">
          <div className="card"><span className="tag">Leverage</span><h3>CORE and shared services</h3><p>Add CORE Wholesale, back office or concierge to your firm.</p><p><Link href="/member/services">See services →</Link></p></div>
          <div className="card"><span className="tag">Referrals</span><h3>Refer work both ways</h3><p>{REFERRAL_TERMS}</p><p><Link href="/member/members">Find a member →</Link></p></div>
        </div>
      </div>
    </>
  );
}
