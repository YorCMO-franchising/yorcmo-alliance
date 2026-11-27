import Link from 'next/link';
import { MEMBERSHIP_INCLUDES, OFFERINGS, REFERRAL_TERMS } from '@/lib/config';

export const metadata = { title: 'Membership' };

const FAQ = [
  ['Who is the Alliance for?', 'Independent marketing leaders: fractional and operating CMOs, and the senior specialists and consultants who work beside them. Members are building a firm they own, not just a calendar of hours.'],
  ['Do I keep my own brand and clients?', 'Yes. You build under your own name. Your firm, your self-sourced clients and your intellectual property stay yours. The membership is one flat monthly fee, with no franchise, no royalties and no cut of your client work.'],
  ['Who is behind it?', 'The Alliance was founded by Joe Frost, who founded yorCMO in 2016 and the Fractional Professionals Association, created the FROST framework and wrote Million Dollar Fractional Firm. FROST is the path members follow, supported by office hours, roundtables and the member community.'],
  ['How does billing work?', `Membership is ${OFFERINGS.membership.price} a month per person, billed by card through Stripe. Update your card, download invoices or cancel from your account.`],
  ['What happens after I pay?', 'Your account is created right away. Sign in with your email (we send a one-time link, no password), complete your profile, and the member area, directory and marketplace open up.'],
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
            <Link className="btn" href="/join">Join now</Link>
            <p className="small" style={{ marginTop: 12, textAlign: 'center' }}><Link href="/talk" style={{ color: '#dfe5ee' }}>Prefer to talk first? Request a call</Link></p>
            <p className="small" style={{ marginTop: 14, color: '#95a2b5' }}>Billed monthly through Stripe.</p>
          </aside>
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
          <p style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn dark" href="/join">Join the Alliance</Link><Link className="btn outline" href="/talk">Talk to us first</Link></p>
        </div>
      </section>
    </>
  );
}
