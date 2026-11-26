import Link from 'next/link';
import { ADD_ONS, MEMBERSHIP_INCLUDES, OFFERINGS, REFERRAL_TERMS } from '@/lib/config';

export const metadata = { title: 'Membership' };

const FAQ = [
  ['Who is the Alliance for?', 'CMOs, fractional and operating executives, marketers, specialists and consultants who want to build a firm they own, not just a calendar of hours.'],
  ['Who runs it?', 'The Alliance was founded by Joe Frost, who founded yorCMO in 2016 and the Fractional Professionals Association, created the FROST framework and wrote Million Dollar Fractional Firm. Joe and the yorCMO team coach members from steady income to a firm they own.'],
  ['How does billing work?', `Membership is ${OFFERINGS.membership.price} a month per person, billed by card through Stripe. Update your card, download invoices or cancel from your account.`],
  ['What happens after I pay?', 'Your account is created right away. Sign in with your email (we send a one-time link, no password), complete your profile, and the member area, directory and marketplace open up.'],
  ['How does the marketplace work?', 'Members list services, delivery capacity, playbooks and niche COREs for other members. Each listing is reviewed before it goes live. Buyers contact sellers through the marketplace and agree terms directly.'],
  ['Can I buy CORE and shared services?', 'Yes. Members can add CORE Wholesale, back office support and concierge from the member area. Each is a separate monthly subscription you can cancel on its own.'],
];

export default function Membership() {
  return (
    <>
      <section className="hero page-hero">
        <div className="wrap">
          <div className="kicker">Alliance membership</div>
          <h1>The best investment you can make in your practice.</h1>
          <p className="lede">Everything you need to build pipeline, deliver through a system, and turn what you know into something you own, with coaching from founder Joe Frost along the way.</p>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <h2>What's included</h2>
            <ul className="checks" style={{ marginTop: 18 }}>
              {MEMBERSHIP_INCLUDES.map((i) => <li key={i}>{i}</li>)}
            </ul>

            <h2 style={{ marginTop: 56 }}>Add when you need them</h2>
            <p className="muted">Available to members from the member area. Each is optional and separately cancellable.</p>
            <div className="grid g3" style={{ marginTop: 18 }}>
              {ADD_ONS.map((k) => (
                <div className="card" key={k}>
                  <span className="tag">{OFFERINGS[k].price} {OFFERINGS[k].unit}</span>
                  <h3>{OFFERINGS[k].name}</h3>
                  <p className="small">{OFFERINGS[k].summary}</p>
                </div>
              ))}
            </div>

            <div className="callout" style={{ marginTop: 32 }}>
              <strong>Referrals between members.</strong> {REFERRAL_TERMS}
            </div>
          </div>

          <aside className="price-card">
            <div className="kicker">Alliance membership</div>
            <h3>All included.</h3>
            <div className="price">{OFFERINGS.membership.price} <small>{OFFERINGS.membership.unit}</small></div>
            <p>{OFFERINGS.membership.summary}</p>
            <Link className="btn" href="/join">Join now</Link>
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
          <p style={{ marginTop: 24 }}><Link className="btn dark" href="/join">Join the Alliance</Link></p>
        </div>
      </section>
    </>
  );
}
