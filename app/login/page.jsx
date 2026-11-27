import LoginForm from '@/components/LoginForm';

export const metadata = { title: 'Sign in' };

export default async function Login({ searchParams }) {
  const sp = await searchParams;
  const next = typeof sp?.next === 'string' ? sp.next : '/member';
  return (
    <div className="wrap">
      <div className="narrow auth-card card">
        <h1>Sign in</h1>
        <p className="muted" style={{ marginBottom: 20 }}>No password needed. We'll email you a one-time sign-in link.</p>
        {sp?.error && <div className="alert err">That sign-in link didn't work or has expired. Request a new one.</div>}
        <LoginForm next={next} />
        <p className="small muted" style={{ marginTop: 18 }}>Not a member yet? <a href="/apply">Apply to join the Alliance</a>.</p>
      </div>
    </div>
  );
}
