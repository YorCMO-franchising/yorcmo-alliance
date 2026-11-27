import Link from 'next/link';
import TalkForm from '@/components/TalkForm';
import { CALL_URL } from '@/lib/config';

export const metadata = { title: 'Talk to us first' };

export default function Talk() {
  return (
    <section>
      <div className="wrap split">
        <div>
          <div className="kicker">Talk to us first</div>
          <h1 style={{ fontSize: 'clamp(32px,4vw,46px)' }}>A 20-minute conversation, no pitch.</h1>
          <p className="lede" style={{ marginTop: 14 }}>
            Tell us where your practice is and what you're building. We'll tell you honestly whether the Alliance
            fits, and what your first 90 days would look like.
          </p>
          {CALL_URL && (
            <p style={{ marginTop: 22 }}>
              <a className="btn dark" href={CALL_URL} target="_blank" rel="noopener noreferrer">Pick a time</a>
            </p>
          )}
          <p className="small muted" style={{ marginTop: 22 }}>
            Ready already? <Link href="/join">Join the Alliance</Link>.
          </p>
        </div>
        <div>
          {CALL_URL && <p className="small muted" style={{ marginBottom: 10 }}>Or send us a note and we'll reach out:</p>}
          <TalkForm />
        </div>
      </div>
    </section>
  );
}
