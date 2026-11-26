import LoginForm from '@/components/LoginForm';
import { stripe } from '@/lib/stripe';
import { getSession } from '@/lib/auth';
import { stripeConfigured } from '@/lib/config';

export const metadata = { title: 'Welcome' };
export const dynamic = 'force-dynamic';

export default async function Welcome({ searchParams }) {
  const sp = await searchParams;
  let email = '';
  if (stripeConfigured && typeof sp?.session_id === 'string' && sp.session_id.startsWith('cs_')) {
    try {
      const s = await stripe().checkout.sessions.retrieve(sp.session_id);
      email = s.customer_details?.email || s.customer_email || '';
    } catch {}
  }
  const session = await getSession();
  return (
    <div className="wrap">
      <div className="narrow auth-card card">
        <div className="kicker">Payment received</div>
        <h1>Welcome to the Alliance.</h1>
        <p style={{ margin: '10px 0 22px' }}>Your membership is being set up now. It usually takes a few seconds.</p>
        {session ? (
          <a className="btn dark block" href="/member">Go to the member area</a>
        ) : (
          <>
            <p className="small muted" style={{ marginBottom: 12 }}>Sign in with the email you paid with to open your member area.</p>
            <LoginForm email={email} next="/member/profile?welcome=1" cta="Email me my sign-in link" />
          </>
        )}
      </div>
    </div>
  );
}
