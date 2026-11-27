'use client';

import { useActionState } from 'react';
import { saveProfile } from '@/lib/actions/member';

export default function ProfileForm({ p }) {
  const [state, action, pending] = useActionState(saveProfile, null);
  return (
    <form action={action} className="f card" style={{ maxWidth: 760 }}>
      {state?.error && <div className="alert err" role="alert">{state.error}</div>}
      {state?.ok && <div className="alert ok" role="status">{state.ok}</div>}
      <div className="row">
        <div><label htmlFor="full_name">Full name</label><input id="full_name" name="full_name" required defaultValue={p.full_name || ''} /></div>
        <div><label htmlFor="title">Title</label><input id="title" name="title" defaultValue={p.title || ''} placeholder="e.g. Fractional CMO, SEO specialist, Brand consultant" /></div>
      </div>
      <div className="row">
        <div><label htmlFor="firm">Firm</label><input id="firm" name="firm" defaultValue={p.firm || ''} /></div>
        <div><label htmlFor="city">City / region</label><input id="city" name="city" defaultValue={p.city || ''} /></div>
      </div>
      <div><label htmlFor="niche">Niches and expertise <span className="muted">(comma separated)</span></label><input id="niche" name="niche" defaultValue={(p.niche || []).join(', ')} placeholder="Manufacturing, Professional services, ABM" /></div>
      <div><label htmlFor="bio">Bio</label><textarea id="bio" name="bio" maxLength={2000} defaultValue={p.bio || ''} placeholder="Who you serve, what you're known for, what you'd like referred to you." /></div>
      <div className="row">
        <div><label htmlFor="website">Website</label><input id="website" name="website" defaultValue={p.website || ''} /></div>
        <div><label htmlFor="linkedin">LinkedIn</label><input id="linkedin" name="linkedin" defaultValue={p.linkedin || ''} /></div>
      </div>
      <label style={{ display: 'flex', gap: 10, fontWeight: 500 }}>
        <input type="checkbox" name="directory_visible" defaultChecked={p.directory_visible} style={{ width: 'auto' }} />
        Show me in the member directory
      </label>
      <button className="btn dark" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save profile'}</button>
    </form>
  );
}
