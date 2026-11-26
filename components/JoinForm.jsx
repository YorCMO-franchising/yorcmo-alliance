'use client';

import { useActionState } from 'react';
import { startMembershipCheckout } from '@/lib/actions/billing';

export default function JoinForm({ email = '', name = '', firm = '' }) {
  const [state, action, pending] = useActionState(startMembershipCheckout, null);
  return (
    <form action={action} className="f card">
      {state?.error && <div className="alert err" role="alert">{state.error}</div>}
      <div><label htmlFor="full_name">Full name</label><input id="full_name" name="full_name" required defaultValue={name} autoComplete="name" /></div>
      <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" required defaultValue={email} autoComplete="email" /></div>
      <div><label htmlFor="firm">Firm</label><input id="firm" name="firm" defaultValue={firm} autoComplete="organization" /></div>
      <label style={{ display: 'flex', gap: 10, fontWeight: 500, alignItems: 'flex-start' }}>
        <input type="checkbox" name="agree" required style={{ width: 'auto', marginTop: 5 }} />
        <span>I agree to the Alliance membership terms, billed monthly until I cancel.</span>
      </label>
      <button className="btn dark block" type="submit" disabled={pending}>{pending ? 'Opening secure checkout…' : 'Continue to payment'}</button>
      <p className="small muted">Payment is handled securely by Stripe. You'll come straight back here afterwards.</p>
    </form>
  );
}
