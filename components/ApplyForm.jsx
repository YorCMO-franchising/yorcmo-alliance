'use client';

import { useActionState } from 'react';
import { submitApplication } from '@/lib/actions/apply';
import { APPLICATION } from '@/lib/config';

export default function ApplyForm() {
  const [state, action, pending] = useActionState(submitApplication, null);
  return (
    <form action={action} className="f card">
      {state?.error && <div className="alert err" role="alert">{state.error}</div>}

      <h3>About you</h3>
      <div className="row">
        <div><label htmlFor="a-name">Full name</label><input id="a-name" name="full_name" required autoComplete="name" /></div>
        <div><label htmlFor="a-email">Email</label><input id="a-email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="row">
        <div><label htmlFor="a-firm">Firm</label><input id="a-firm" name="firm" autoComplete="organization" /></div>
        <div><label htmlFor="a-city">City / region</label><input id="a-city" name="city" /></div>
      </div>
      <div className="row">
        <div>
          <label htmlFor="a-role">I am a…</label>
          <select id="a-role" name="role" required defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>CMO (fractional or operating)</option>
            <option>Marketing specialist</option>
            <option>Consultant or advisor</option>
            <option>Marketer going independent</option>
            <option>Other</option>
          </select>
        </div>
        <div><label htmlFor="a-years">Years in marketing</label><input id="a-years" name="years_experience" type="number" min="0" max="60" required /></div>
      </div>
      <div className="row">
        <div><label htmlFor="a-web">Website</label><input id="a-web" name="website" /></div>
        <div><label htmlFor="a-li">LinkedIn</label><input id="a-li" name="linkedin" /></div>
      </div>
      <div><label htmlFor="a-spec">Specialty and niches <span className="muted">(comma separated)</span></label><input id="a-spec" name="specialty" required placeholder="e.g. B2B SaaS, demand generation, HubSpot" /></div>

      <h3 style={{ marginTop: 10 }}>Your work</h3>
      <div><label htmlFor="a-samples">Work samples</label><textarea id="a-samples" name="work_samples" required placeholder="Links to a case study, portfolio or examples of your work, with a line on your role in each." /></div>

      <h3 style={{ marginTop: 10 }}>Two references</h3>
      <p className="small muted" style={{ marginTop: -6 }}>Clients or peers who know your work. We'll contact them during review.</p>
      {[1, 2].map((n) => (
        <div className="row3" key={n}>
          <div><label htmlFor={`r${n}n`}>Reference {n} name</label><input id={`r${n}n`} name={`ref${n}_name`} required /></div>
          <div><label htmlFor={`r${n}e`}>Email</label><input id={`r${n}e`} name={`ref${n}_email`} type="email" required /></div>
          <div><label htmlFor={`r${n}r`}>Relationship</label><input id={`r${n}r`} name={`ref${n}_relationship`} placeholder="e.g. Client, 2022–24" /></div>
        </div>
      ))}

      <h3 style={{ marginTop: 10 }}>Your goals</h3>
      <div><label htmlFor="a-goals">What do you want to build, and what do you want from the Alliance?</label><textarea id="a-goals" name="goals" required /></div>

      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="a-company">Company</label><input id="a-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="fee-box">
        <strong>Application fee: {APPLICATION.fee}</strong>
        <ul>
          <li>Accepted? Your fee covers your first month. Membership then renews at {APPLICATION.fee}/month on the same card.</li>
          <li>Not accepted? We refund the full {APPLICATION.fee}.</li>
          <li>You'll hear from us within {APPLICATION.decisionDays} business days.</li>
        </ul>
      </div>
      <label style={{ display: 'flex', gap: 10, fontWeight: 500, alignItems: 'flex-start' }}>
        <input type="checkbox" name="agree" required style={{ width: 'auto', marginTop: 5 }} />
        <span>I understand the {APPLICATION.fee} fee is refunded in full if I'm not accepted, and if I'm accepted it covers my first month before monthly billing begins.</span>
      </label>
      <button className="btn dark block" type="submit" disabled={pending}>{pending ? 'Opening secure payment…' : `Submit and pay ${APPLICATION.fee}`}</button>
      <p className="small muted">Payment is handled securely by Stripe.</p>
    </form>
  );
}
