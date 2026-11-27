import { redirect } from 'next/navigation';
import JoinForm from '@/components/JoinForm';
import { getSession, isActive } from '@/lib/auth';
import { MEMBERSHIP_INCLUDES, OFFERINGS, priceIdFor, stripeConfigured } from '@/lib/config';

export const metadata = { title: 'Join the Alliance' };

export default async function Join({ searchParams }) {
  const sp = await searchParams;
  const session = await getSession();
  if (session && isActive(session.profile)) redirect('/member');
  const ready = stripeConfigured && priceIdFor('membership');
  return (
    <section>
      <div className="wrap split">
        <div>
          <div className="kicker">Join the Alliance</div>
          <h1 style={{ fontSize: 'clamp(32px,4vw,46px)' }}>Start building the firm you own.</h1>
          <p className="lede" style={{ marginTop: 14 }}>
            <strong>{OFFERINGS.membership.price}</strong> {OFFERINGS.membership.unit}. Everything included:
          </p>
          <ul className="checks" style={{ marginTop: 14 }}>
            {MEMBERSHIP_INCLUDES.slice(0, 8).map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
        <div>
          {sp?.canceled && <div className="alert info">Checkout was cancelled. Nothing was charged. You can try again below.</div>}
          {session && session.profile?.membership_status === 'past_due' && (
            <div className="alert info">Your membership has a payment issue. <a href="/account">Update billing</a> instead of joining again.</div>
          )}
          {ready ? (
            <JoinForm email={session?.user.email || ''} name={session?.profile?.full_name || ''} firm={session?.profile?.firm || ''} />
          ) : (
            <div className="card"><h3>Online sign-up opens soon</h3><p>Payments aren't switched on yet. Please check back shortly.</p></div>
          )}
          <p className="small muted" style={{ marginTop: 16 }}>Prefer to talk first? <a href="/talk">Request a 20-minute call</a>. Already a member? <a href="/login">Sign in</a>.</p>
        </div>
      </div>
    </section>
  );
}
