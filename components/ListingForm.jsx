'use client';

import { useActionState, useState } from 'react';
import { saveListing } from '@/lib/actions/member';
import { CATEGORIES, PRICING_MODELS } from '@/lib/config';

export default function ListingForm({ listing }) {
  const [state, action, pending] = useActionState(saveListing, null);
  const [model, setModel] = useState(listing?.pricing_model || 'quote');
  const price = listing?.price_cents != null ? String(listing.price_cents / 100) : '';
  return (
    <form action={action} className="f card" style={{ maxWidth: 760 }}>
      {state?.error && <div className="alert err" role="alert">{state.error}</div>}
      {listing && <input type="hidden" name="id" value={listing.id} />}
      <div><label htmlFor="title">Title</label><input id="title" name="title" required maxLength={120} defaultValue={listing?.title} placeholder="e.g. HubSpot implementation for B2B services firms" /></div>
      <div className="row">
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" required defaultValue={listing?.category || ''}>
            <option value="" disabled>Choose one</option>
            {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div><label htmlFor="tags">Tags <span className="muted">(comma separated)</span></label><input id="tags" name="tags" defaultValue={listing?.tags?.join(', ')} placeholder="Manufacturing, HubSpot, SEO" /></div>
      </div>
      <div><label htmlFor="summary">Summary <span className="muted">(shown on the card, max 280)</span></label><textarea id="summary" name="summary" required maxLength={280} style={{ minHeight: 80 }} defaultValue={listing?.summary} /></div>
      <div><label htmlFor="description">Details</label><textarea id="description" name="description" style={{ minHeight: 180 }} defaultValue={listing?.description || ''} placeholder="What's included, who it's for, how delivery works, timelines." /></div>
      <div className="row">
        <div>
          <label htmlFor="pricing_model">Pricing</label>
          <select id="pricing_model" name="pricing_model" value={model} onChange={(e) => setModel(e.target.value)}>
            {Object.entries(PRICING_MODELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="price">Price (USD)</label>
          <input id="price" name="price" inputMode="decimal" disabled={model === 'quote'} defaultValue={price} placeholder={model === 'quote' ? 'Not needed' : 'e.g. 2500'} />
        </div>
      </div>
      <p className="small muted">New listings, and edits to live listings, are reviewed by yorCMO before they appear in the marketplace.</p>
      <button className="btn dark" type="submit" disabled={pending}>{pending ? 'Saving…' : listing ? 'Save and resubmit' : 'Submit for review'}</button>
    </form>
  );
}
