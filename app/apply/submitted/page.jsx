import Link from 'next/link';
import { APPLICATION } from '@/lib/config';

export const metadata = { title: 'Application received' };

export default function Submitted() {
  return (
    <div className="wrap">
      <div className="narrow auth-card card">
        <div className="kicker">Application received</div>
        <h1>Thank you for applying.</h1>
        <p style={{ margin: '12px 0' }}>Your {APPLICATION.fee} application fee is paid and your application is in the review queue. Here's what happens next:</p>
        <ol style={{ margin: '0 0 0 20px' }}>
          <li>We review your application and work samples.</li>
          <li>We email you to schedule a 30-minute interview.</li>
          <li>We contact your two references.</li>
          <li>You get our decision within {APPLICATION.decisionDays} business days.</li>
        </ol>
        <p style={{ marginTop: 14 }}>If you're accepted, your fee covers your first month and you'll sign in with your email. If not, we refund the full {APPLICATION.fee}.</p>
        <p style={{ marginTop: 22 }}><Link className="btn dark" href="/story">Read our story while you wait</Link></p>
      </div>
    </div>
  );
}
