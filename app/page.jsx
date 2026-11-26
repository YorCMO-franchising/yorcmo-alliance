import Link from 'next/link';
import { OFFERINGS } from '@/lib/config';
import { JOE_PHOTO } from '@/lib/founder';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">The yorCMO Alliance</div>
          <h1>You build equity for everyone but yourself. <em>Start building your own.</em></h1>
          <p className="lede">
            Every company that hires you counts on your expertise to build value in its business. When you stop
            showing up, the pay stops, and the value you built stays with them. The Alliance is a membership for
            marketing leaders who want what they know to build something they own.
          </p>
          <div className="ctas">
            <Link className="btn" href="/join">Join the Alliance</Link>
            <Link className="btn ghost" href="/story">Read our story</Link>
          </div>
        </div>
      </section>

      <section className="white">
        <div className="wrap split">
          <div>
            <div className="kicker">How this started</div>
            <h2>Ten years ago, we bet that great CMOs didn't need to be full-time.</h2>
            <p className="lede">
              In 2016, Joe Frost founded yorCMO on a simple idea: growing companies need senior marketing
              leadership, and the best marketing leaders can deliver it to several companies at once.
            </p>
            <p style={{ marginTop: 16 }}>
              The bet paid off. Since then, more than 25 CMOs have run our system, the 6 Fundamentals of Marketing,
              for more than 100 companies. But working alongside those CMOs, we kept seeing the same two problems.
            </p>
            <p>
              <strong>They were hunting for clients alone.</strong> The work was excellent; the pipeline wasn't.
              And <strong>they were building value that walked out the door with them.</strong> Every system they
              installed, every team they trained, stayed with the client.
            </p>
            <p>The Alliance is our answer to both.</p>
            <p style={{ marginTop: 22 }}><Link href="/story">The full story →</Link></p>
          </div>
          <div className="grid">
            <div className="card"><span className="stat-n">2016</span><p>yorCMO founded to bring senior marketing leadership to growing companies</p></div>
            <div className="card"><span className="stat-n">25+</span><p>CMOs who have run the 6 Fundamentals of Marketing</p></div>
            <div className="card"><span className="stat-n">100+</span><p>companies served with the system</p></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">What the Alliance does</div>
            <h2>Pipeline, leverage, and a market for what you know.</h2>
          </div>
          <div className="grid g3">
            <div className="card">
              <span className="tag">Leads first</span>
              <h3>Rooms owners already trust</h3>
              <p>
                Our book campaign, speaking and community help you find where your niche gathers, so you're not
                hunting alone. Members refer clients to each other, with a suggested 20% first-year and 10%
                ongoing referral share.
              </p>
            </div>
            <div className="card">
              <span className="tag">Leverage</span>
              <h3>A system that runs without you</h3>
              <p>
                Cobbler™ runs your practice the way CORE, our marketing operating system, runs a client's
                marketing. When you're ready, take CORE to your clients at wholesale and mark it up as you like.
              </p>
            </div>
            <div className="card">
              <span className="tag">Marketplace</span>
              <h3>Sell to people who get it</h3>
              <p>
                List your services, delivery capacity, playbooks and niche COREs for other members, and buy from
                members who deliver the work the way you would.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap founder">
          <img className="founder-photo" src={JOE_PHOTO} alt="Joe Frost" width="320" height="320" />
          <div>
            <div className="kicker">Your founder and coach</div>
            <h2>Joe Frost</h2>
            <p className="lede" style={{ color: '#dfe5ee' }}>
              7× founder, 25 years as an entrepreneur, university professor of entrepreneurship, and creator of
              the FROST framework for building a fractional firm.
            </p>
            <p style={{ marginTop: 14 }}>
              Joe founded yorCMO and the Fractional Professionals Association, the country's largest
              community of fractional executives, and serves as President of EO Nebraska. He wrote{' '}
              <em>Million Dollar Fractional Firm</em> after watching talented fractionals stay stuck as contractors
              when they had everything they needed to build a firm. In the Alliance, he coaches members from steady
              income, to a practice that scales, to a firm they own.
            </p>
            <blockquote className="founder-quote">
              "We spent the first decade teaching CMOs how to become fractional executives. Let's spend the next
              decade teaching them how to become equity executives."
            </blockquote>
            <p style={{ marginTop: 22 }}><Link className="btn" href="/story#joe">More about Joe</Link></p>
          </div>
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">The path Joe coaches</div>
            <h2>Earn. Scale. Own.</h2>
            <p className="lede">Three stages built on the five FROST pillars: Focus, Resourcing, Own Your Market, Systems and Transfer Trust. Every quarter we track income, owner delivery hours, repeatable revenue, profit and transferable assets, so you can see the firm becoming an asset.</p>
          </div>
          <div className="grid g3 eso">
            <div className="card"><span className="tag">Focus · Own Your Market</span><h3>Earn</h3><p>Build a repeatable pipeline and steady income through Cobbler, referrals, collaboration with members, and work with the yorCMO flagship firm.</p></div>
            <div className="card"><span className="tag">Resourcing · Systems</span><h3>Scale</h3><p>Document your methods, productize your offers, and hand delivery to trusted capacity, much of it from other members.</p></div>
            <div className="card"><span className="tag">Transfer Trust</span><h3>Own</h3><p>Develop your own IP, recurring offers, an independent client base, and a delivery system that runs without you.</p></div>
          </div>
        </div>
      </section>

      <section className="center">
        <div className="wrap">
          <div className="kicker">Membership</div>
          <h2>One membership. Everything included.</h2>
          <p className="lede">
            Certification in the 6 Fundamentals, Cobbler, Microsoft Teams and GoHighLevel, office hours, research,
            roundtables, your directory profile and the member marketplace. {OFFERINGS.membership.price} a month.
          </p>
          <p style={{ marginTop: 26, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn dark" href="/join">Join the Alliance</Link>
            <Link className="btn outline" href="/membership">What's included</Link>
          </p>
          <p className="quote" style={{ margin: '56px auto 0' }}>
            We are not freelancers. <em>We are firm owners.</em>
          </p>
          <p className="muted small" style={{ marginTop: 10 }}>From The Fractional Firm Manifesto by Joe Frost</p>
        </div>
      </section>
    </>
  );
}
