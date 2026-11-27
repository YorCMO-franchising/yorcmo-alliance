import Link from 'next/link';
import ApplyForm from '@/components/ApplyForm';
import VettingSteps from '@/components/VettingSteps';
import { getSession, isActive } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Apply to join' };

export default async function Apply({ searchParams }) {
  const sp = await searchParams;
  const session = await getSession();
  if (session && isActive(session.profile)) redirect('/member');
  return (
    <section>
      <div className="wrap split">
        <div>
          <div className="kicker">Apply to join</div>
          <h1 style={{ fontSize: 'clamp(32px,4vw,46px)' }}>Membership is by application.</h1>
          <p className="lede" style={{ marginTop: 14 }}>
            Every member is vetted, so when you refer work, buy from the marketplace or bring someone into a client,
            you know the bar they've cleared.
          </p>
          <h2 style={{ fontSize: 24, marginTop: 34 }}>How it works</h2>
          <VettingSteps />
          <p className="small muted" style={{ marginTop: 18 }}>
            Want to talk before you apply? <Link href="/talk">Request a 20-minute call</Link>.
            Already a member? <Link href="/login">Sign in</Link>.
          </p>
        </div>
        <div>
          {sp?.canceled && <div className="alert info">Payment was cancelled, so your application wasn't submitted. Nothing was charged. You can try again below.</div>}
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}
