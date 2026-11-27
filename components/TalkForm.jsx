'use client';

import { useActionState } from 'react';
import { requestCall } from '@/lib/actions/contact';

export default function TalkForm() {
  const [state, action, pending] = useActionState(requestCall, null);
  if (state?.ok) {
    return (
      <div className="alert ok" role="status">
        Thanks. We'll email you within two business days to find a time.
      </div>
    );
  }
  return (
    <form action={action} className="f card">
      {state?.error && <div className="alert err" role="alert">{state.error}</div>}
      <div className="row">
        <div><label htmlFor="t-name">Name</label><input id="t-name" name="full_name" required autoComplete="name" /></div>
        <div><label htmlFor="t-email">Email</label><input id="t-email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="row">
        <div><label htmlFor="t-firm">Firm</label><input id="t-firm" name="firm" autoComplete="organization" /></div>
        <div>
          <label htmlFor="t-role">I am a…</label>
          <select id="t-role" name="role" defaultValue="">
            <option value="">Choose one</option>
            <option>Fractional or operating CMO</option>
            <option>Marketing specialist</option>
            <option>Consultant</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div><label htmlFor="t-msg">What would you like to talk about?</label><textarea id="t-msg" name="message" placeholder="Where your practice is today, and what you want from the Alliance." /></div>
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="t-web">Website</label><input id="t-web" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn dark" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Request a call'}</button>
    </form>
  );
}
