import { Fragment } from 'react';
import { requireAdmin } from '@/lib/auth';
import { APPLICATION } from '@/lib/config';
import { approveApplication, declineApplication, saveReview } from '@/lib/actions/applications';

export const metadata = { title: 'Applications' };

const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-US', { dateStyle: 'medium' }) : '—');

// Business days since a date (Mon–Fri), to keep the 10-day promise visible.
function businessDaysSince(d) {
  let n = 0; const day = new Date(d); const now = new Date();
  while (day < now) { day.setDate(day.getDate() + 1); if (day.getDay() % 6 !== 0 && day <= now) n++; }
  return n;
}

function Detail({ a }) {
  const rows = [
    ['Role', a.role], ['Years in marketing', a.years_experience], ['Firm', a.firm], ['City', a.city],
    ['Specialty', a.specialty], ['Website', a.website], ['LinkedIn', a.linkedin],
    ['Work samples', a.work_samples],
    ['Reference 1', [a.ref1_name, a.ref1_email, a.ref1_relationship].filter(Boolean).join(' · ')],
    ['Reference 2', [a.ref2_name, a.ref2_email, a.ref2_relationship].filter(Boolean).join(' · ')],
    ['Goals', a.goals],
  ];
  return <dl>{rows.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v || '—'}</dd></Fragment>)}</dl>;
}

export default async function Applications({ searchParams }) {
  const sp = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: apps } = await supabase.from('applications').select('*').neq('status', 'pending_payment').order('created_at', { ascending: true }).limit(200);
  const open = (apps || []).filter((a) => a.status === 'submitted');
  const decided = (apps || []).filter((a) => a.status !== 'submitted').reverse();
  return (
    <>
      <div className="page-head"><div><div className="kicker">Admin</div><h1>Applications</h1>
        <p className="muted">Approve unlocks once work samples, interview and references are all checked. Decide within {APPLICATION.decisionDays} business days.</p></div></div>
      {sp?.msg && <div className="alert ok">{sp.msg}</div>}

      <h2 style={{ fontSize: 24 }}>Waiting for a decision ({open.length})</h2>
      {open.length ? open.map((a) => {
        const ready = a.samples_reviewed && a.interview_done && a.references_checked;
        const days = businessDaysSince(a.paid_at || a.created_at);
        return (
          <details className="card app-card" key={a.id} style={{ marginBottom: 14 }} open={open.length <= 3}>
            <summary>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div><h3 style={{ margin: 0 }}>{a.full_name}</h3><div className="small muted">{a.role} · {a.email}</div></div>
                <div className="small" style={{ textAlign: 'right' }}>
                  Applied {fmt(a.paid_at || a.created_at)}<br />
                  <span className={`status ${days > APPLICATION.decisionDays ? 'rejected' : days > APPLICATION.decisionDays - 3 ? 'pending' : 'approved'}`}>Day {days} of {APPLICATION.decisionDays}</span>
                </div>
              </div>
            </summary>
            <Detail a={a} />
            <form action={saveReview} className="f">
              <input type="hidden" name="id" value={a.id} />
              <div className="checklist">
                <label><input type="checkbox" name="samples_reviewed" defaultChecked={a.samples_reviewed} /> Work samples reviewed</label>
                <label><input type="checkbox" name="interview_done" defaultChecked={a.interview_done} /> Interview done</label>
                <label><input type="checkbox" name="references_checked" defaultChecked={a.references_checked} /> References checked</label>
              </div>
              <div><label htmlFor={`n-${a.id}`}>Review notes (internal)</label><textarea id={`n-${a.id}`} name="review_notes" defaultValue={a.review_notes || ''} style={{ minHeight: 80 }} /></div>
              <div><button className="btn sm outline" type="submit">Save review</button></div>
            </form>
            <div className="actions" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
              <form action={approveApplication}>
                <input type="hidden" name="id" value={a.id} />
                <button className="btn sm dark" type="submit" disabled={!ready} title={ready ? '' : 'Complete the checklist first'}>Approve: fee covers first month</button>
              </form>
              <form action={declineApplication}>
                <input type="hidden" name="id" value={a.id} />
                <button className="btn sm outline" type="submit">Decline and refund {APPLICATION.fee}</button>
              </form>
              <a className="btn sm outline" href={`mailto:${a.email}?subject=${encodeURIComponent('Your yorCMO Alliance application')}`}>Email applicant</a>
            </div>
          </details>
        );
      }) : <div className="empty">No applications waiting.</div>}

      <h2 style={{ fontSize: 24, marginTop: 36 }}>Decided</h2>
      {decided.length ? (
        <table className="t">
          <thead><tr><th>Applicant</th><th>Role</th><th>Decision</th><th>Date</th></tr></thead>
          <tbody>{decided.map((a) => (
            <tr key={a.id}>
              <td><strong>{a.full_name}</strong><div className="small muted">{a.email}</div></td>
              <td>{a.role}</td>
              <td><span className={`status ${a.status === 'approved' ? 'approved' : 'rejected'}`}>{a.status}{a.refunded_at ? ' · refunded' : ''}</span></td>
              <td>{fmt(a.decided_at)}</td>
            </tr>
          ))}</tbody>
        </table>
      ) : <div className="empty">No decisions yet.</div>}
    </>
  );
}
