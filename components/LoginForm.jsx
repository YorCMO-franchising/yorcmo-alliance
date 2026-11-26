'use client';

import { useActionState } from 'react';
import { sendMagicLink } from '@/lib/actions/auth';

export default function LoginForm({ next = '/member', email = '', cta = 'Email me a sign-in link' }) {
  const [state, action, pending] = useActionState(sendMagicLink, null);
  if (state?.sent) {
    return (
      <div className="alert ok" role="status">
        Check <strong>{state.sent}</strong> for a sign-in link. It works once and expires in an hour.
      </div>
    );
  }
  return (
    <form action={action} className="f">
      {state?.error && <div className="alert err" role="alert">{state.error}</div>}
      <input type="hidden" name="next" value={next} />
      <div><label htmlFor="login-email">Email</label><input id="login-email" name="email" type="email" required defaultValue={email} autoComplete="email" /></div>
      <button className="btn dark block" type="submit" disabled={pending}>{pending ? 'Sending…' : cta}</button>
    </form>
  );
}
