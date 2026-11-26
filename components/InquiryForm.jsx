'use client';

import { useActionState } from 'react';
import { sendInquiry } from '@/lib/actions/member';

export default function InquiryForm({ listingId }) {
  const [state, action, pending] = useActionState(sendInquiry, null);
  if (state?.ok) return <div className="alert ok" role="status">{state.ok}</div>;
  return (
    <form action={action} className="f">
      {state?.error && <div className="alert err" role="alert">{state.error}</div>}
      <input type="hidden" name="listing_id" value={listingId} />
      <div><label htmlFor="msg">Message to the seller</label><textarea id="msg" name="message" required placeholder="What do you need, and by when?" /></div>
      <button className="btn dark block" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Contact seller'}</button>
    </form>
  );
}
