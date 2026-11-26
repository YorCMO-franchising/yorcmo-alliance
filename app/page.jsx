import Link from 'next/link';
import { OFFERINGS } from '@/lib/config';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">The yorCMO Alliance</div>
          <h1>You build equity for everyone but yourself. <em>Start building your own.</em></h1>
          <p className="lede">
            The Alliance is the membership for CMOs, marketers, specialists and consultants building firms they own.
            Get in front of owners, run the system, sell what you know to other members, and keep the upside.
          </p>
          <div className="ctas">
            <Link className="btn" href="/join">Join for {OFFERINGS.membership.price}/month</Link>
            <Link className="btn ghost" href="/marketplace">See the marketplace</Link>
          </div>
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">What you get</div>
            <h2>Pipeline, leverage, and a market for what you know.</h2>
          </div>
          <div className="grid g3">
            <div className="card">
              <span className="tag">Leads first</span>
              <h3>Rooms owners already trust</h3>
              <p>
                The Foundation First book campaign, speaking, and a community that helps you find where your niche
                gathers, so you're not hunting alone. Refer clients between members, with a suggested 20% first-year
                and 10% ongoing referral share.
              </p>
            </div>
            <div className="card">
              <span className="tag">Leverage</span>
              <h3>Cobbler™ and CORE</h3>
              <p>
                Cobbler runs your practice the way CORE runs a client's marketing. When you're ready, take CORE to your
                clients at wholesale, {OFFERINGS.core_wholesale.price}/month, marked up as you like.
              </p>
            </div>
            <div className="card">
              <span className="tag">Marketplace</span>
              <h3>Sell to other members</h3>
              <p>
                List your services, delivery capacity, playbooks and niche COREs. Buy from members who deliver the work
                the way you would.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">The path from income to equity</div>
            <h2>Earn. Scale. Own.</h2>
            <p className="lede">Members are coached through the FROST framework, and every quarter we track income, owner delivery hours, repeatable revenue, profit and transferable assets.</p>
          </div>
          <div className="grid g3 eso">
            <div className="card"><span className="tag">Earn</span><h3>Earn</h3><p>Build a repeatable pipeline and stabilize your income through Cobbler, referrals, collaboration, and work with the flagship firm.</p></div>
            <div className="card"><span className="tag">Scale</span><h3>Scale</h3><p>Document your methods, productize your offers, and delegate delivery to trusted capacity, much of it from other members.</p></div>
            <div className="card"><span className="tag">Own</span><h3>Own</h3><p>Develop proprietary IP, recurring offers, an independent client base, and a delivery system that runs without you.</p></div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap split">
          <div>
            <div className="kicker">Membership</div>
            <h2>One membership. Everything included.</h2>
            <p>Certification in the 6 Fundamentals of Marketing, Cobbler, Microsoft Teams and GoHighLevel, office hours, research drops, roundtables, brand templates, your directory profile, and the member marketplace.</p>
            <p>Since 2016, more than 25 CMOs have run the 6 Fundamentals for more than 100 companies. Now it's yours to build on.</p>
            <p style={{ marginTop: 26 }}><Link className="btn" href="/membership">What's included</Link></p>
          </div>
          <div className="card">
            <div className="kicker">Alliance membership</div>
            <div className="price" style={{ color: '#fff' }}>{OFFERINGS.membership.price} <small>{OFFERINGS.membership.unit}</small></div>
            <p>Sign up online in two minutes. Your member area opens as soon as payment clears.</p>
            <Link className="btn block" style={{ marginTop: 20 }} href="/join">Join the Alliance</Link>
          </div>
        </div>
      </section>

      <section className="center">
        <div className="wrap">
          <p className="quote" style={{ margin: '0 auto' }}>
            You bring the expertise. We bring the leverage. <em>You build the equity in your firm.</em>
          </p>
          <p style={{ marginTop: 30 }}><Link className="btn dark" href="/join">Join the Alliance</Link></p>
        </div>
      </section>
    </>
  );
}
