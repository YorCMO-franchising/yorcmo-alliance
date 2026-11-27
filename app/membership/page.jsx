import Link from 'next/link';
import { APPLICATION, MEMBERSHIP_INCLUDES, OFFERINGS, REFERRAL_TERMS } from '@/lib/config';
import VettingSteps from '@/components/VettingSteps';

export const metadata = { title: 'Membership' };

const FAQ = [
  ['Who is the Alliance for?', 'Marketing entrepreneurs: fractional and operating CMOs, marketing specialists, consultants and advisors, and marketers building a practice of their own. Members are building a firm they own, not just a calendar of hours.'],
  ['Do I keep my own brand and clients?', 'Yes. You build under your own name. Your firm, your self-sourced clients and your intellectual property stay yours. The membership is one flat monthly fee, with no franchise, no royalties and no cut of your client work.'],
  ['Who is behind it?', 'The Alliance was founded by Joe Frost, who founded yorCMO in 2016 and the Fractional Professionals Association, created the FROST framework and wrote Million Dollar Fractional Firm. FROST is the path members follow, supported by office hours, roundtables and the member community.'],
  ['How does joining work?', `Membership is by application. You apply, share work samples and two references, and pay a ${APPLICATION.fee} application fee. We review your work, interview you and speak with your references, and you hear from us within ${APPLICATION.decisionDays} business days.`],
  ['What happens to the application fee?', `If you're accepted, it covers your first month. Membership then renews at ${OFFERINGS.membership.price} a month on the same card, and you can manage or cancel it from your account. If you're not accepted, we refund the full ${APPLICATION.fee}.`],
  ["What happens once I'm accepted?", 'Your account is ready right away. Sign in with your email (we send a one-time link, no password), complete your profile, and the member area, directory and marketplace open up.'],
  ['How does the marketplace work?', 'Members list services, delivery capacity, playbooks and products for other members. Each listing is reviewed before it goes live. Buyers contact sellers through the marketplace and agree terms directly.'],
];

export default function Membership() {
  return (
    <>
      <section className="hero page-hero">
        <div className="wrap">
          <div className="kicker">Alliance membership</div>
          <h1>The best investment you can make in your practice.</h1>
          <p className="lede">Everything you need to build pipeline, deliver through a system, and turn what you know into something you own, guided by founder Joe Frost's FROST framework.</p>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <h2>What's included</h2>
            <ul className="checks" style={{ marginTop: 18 }}>
              {MEMBERSHIP_INCLUDES.map((i) => <li key={i}>{i}</li>)}
            </ul>

            <div className="callout" style={{ marginTop: 40 }}>
              <strong>Referrals between members.</strong> {REFERRAL_TERMS}
            </div>
          </div>

          <aside className="price-card">
            <div className="kicker">Alliance membership</div>
            <h3>All included.</h3>
            <div className="price">{OFFERINGS.membership.price} <small>{OFFERINGS.membership.unit}</small></div>
            <p>{OFFERINGS.membership.summary}</p>
            <p className="small" style={{ marginTop: 10, color: '#dfe5ee' }}>By application. {APPLICATION.fee} application fee, refunded if you're not accepted, covers your first month if you are.</p>
            <Link className="btn" href="/apply">Apply now</Link>
            <p className="small" style={{ marginTop: 12, textAlign: 'center' }}><Link href="/talk" style={{ color: '#dfe5ee' }}>Prefer to talk first? Request a call</Link></p>
            <p className="small" style={{ marginTop: 14, color: '#95a2b5' }}>Billed monthly through Stripe after your first month.</p>
          </aside>
        </div>
      </section>

      <section className="dark" id="how-to-join">
        <div className="wrap split">
          <div>
            <div className="kicker">How to join</div>
            <h2>Membership is by application.</h2>
            <p className="lede" style={{ color: '#dfe5ee' }}>
              Every member is vetted, so when you refer work, buy from the marketplace or bring a member into a
              client, you know the bar they've cleared.
            </p>
            <p style={{ marginTop: 22 }}><Link className="btn" href="/apply">Start your application</Link></p>
          </div>
          <VettingSteps dark />
        </div>
      </section>

      <section className="white">
        <div className="wrap narrow" style={{ maxWidth: 820 }}>
          <div className="kicker">Questions</div>
          <h2>Frequently asked</h2>
          {FAQ.map(([q, a]) => (
            <div key={q} style={{ borderTop: '1px solid var(--line)', padding: '20px 0' }}>
              <h3 style={{ fontSize: 19 }}>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
          <p style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn dark" href="/apply">Apply to join</Link><Link className="btn outline" href="/talk">Talk to us first</Link></p>
        </div>
      </section>
    </>
  );
}
