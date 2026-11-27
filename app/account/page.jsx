import Link from 'next/link';
import { requireUser, isActive } from '@/lib/auth';
import { openBillingPortal } from '@/lib/actions/billing';

export const metadata = { title: 'My account' };

const COPY = {
  none: ['No active membership', 'Your account is set up, but there is no membership on it yet. Membership is by application.'],
  past_due: ['Payment issue', 'Your last membership payment didn\'t go through. Update your card to keep access.'],
  canceled: ['Membership ended', 'Your membership has ended. Contact the Alliance team to rejoin.'],
  active: ['Active member', 'Your membership is active.'],
};

export default async function Account() {
  const { user, profile } = await requireUser('/account');
  const status = profile?.membership_status || 'none';
  const [title, body] = COPY[status] || COPY.none;
  return (
    <div className="wrap">
      <div className="narrow auth-card card">
        <div className="kicker">My account</div>
        <h1>{title}</h1>
        <p className="muted">{user.email}</p>
        <p style={{ margin: '14px 0 22px' }}>{body}</p>
        <div className="actions">
          {isActive(profile) && <Link className="btn dark" href="/member">Member area</Link>}
          {status === 'none' && <Link className="btn dark" href="/apply">Apply to join</Link>}
          {profile?.stripe_customer_id && (
            <form action={openBillingPortal}><button className="btn outline" type="submit">Manage billing</button></form>
          )}
        </div>
        <p className="small muted" style={{ marginTop: 20 }}>Just accepted? Your membership is switched on the moment we approve your application.</p>
      </div>
    </div>
  );
}
