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
            showing up, the pay stops, and the value you built stays with them. The Alliance is a community for
            marketing entrepreneurs (CMOs, marketers, specialists and consultants) who want what they know to build
            something they own.
          </p>
          <div className="ctas">
            <Link className="btn" href="/apply">Apply to join</Link>
            <Link className="btn ghost" href="/talk">Talk to us first</Link>
          </div>
          <p style={{ marginTop: 18 }}><Link href="/story" style={{ color: '#dfe5ee' }}>Read our story →</Link></p>
        </div>
      </section>

      <section className="independence">
        <div className="wrap">
          <div className="kicker">You stay independent</div>
          <h2>Your firm. Your name. Your clients.</h2>
          <div className="grid g4" style={{ marginTop: 26 }}>
            <div className="card"><h3>Keep your brand</h3><p>Build under your own name. The Alliance is behind you, not on your business card.</p></div>
            <div className="card"><h3>Your clients and IP stay yours</h3><p>Your firm, your self-sourced clients and your intellectual property belong to you.</p></div>
            <div className="card"><h3>One flat membership</h3><p>{OFFERINGS.membership.price} a month. No franchise, no royalties, no cut of your client work.</p></div>
            <div className="card"><h3>Month to month</h3><p>No long-term agreement. Manage or cancel your membership from your account anytime.</p></div>
          </div>
        </div>
      </section>

      <section className="white" id="who">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Who's in the Alliance</div>
            <h2>Everyone who builds marketing for a living, on their own terms.</h2>
            <p className="lede">
              Different crafts, same goal: turn expertise into a firm you own. And everyone needs each other. Leaders
              need trusted hands to deliver the work. Specialists need the work leaders bring in.
            </p>
          </div>
          <div className="grid g4">
            <div className="card"><span className="tag">Leaders</span><h3>CMOs</h3><p>Fractional and operating marketing leaders. Find specialists you trust to deliver, and pass on the work you can't take.</p></div>
            <div className="card"><span className="tag">Specialists</span><h3>Marketing specialists</h3><p>SEO, paid media, content, design, RevOps, analytics. Get in front of the leaders and owners who need what you do.</p></div>
            <div className="card"><span className="tag">Advisors</span><h3>Consultants</h3><p>Strategy, brand, sales and growth advisors. Productize what you know and license it to members across the Alliance.</p></div>
            <div className="card"><span className="tag">Builders</span><h3>Marketers going independent</h3><p>Starting out or growing a solo practice into a firm. Build alongside people a few steps ahead of you.</p></div>
          </div>
        </div>
      </section>

      <section>
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
              for more than 100 companies. But working alongside those CMOs, and the specialists and consultants they
              partnered with, we kept seeing the same two problems.
            </p>
            <p>
              <strong>Independent marketers hunt for clients alone.</strong> The work is excellent; the pipeline isn't.
              And <strong>the value they build walks out the door with them.</strong> Every system they install,
              every team they train, stays with the client.
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

      <section className="white">
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
                Cobbler™, our practice workspace, and the FROST framework give you a system for pipeline, delivery
                and growth, so the firm doesn't depend on you being in every meeting.
              </p>
            </div>
            <div className="card">
              <span className="tag">Marketplace</span>
              <h3>Sell to people who get it</h3>
              <p>
                List your services, delivery capacity, playbooks and products for other members, and buy from
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
            <div className="kicker">Founder</div>
            <h2>Joe Frost</h2>
            <p className="lede" style={{ color: '#dfe5ee' }}>
              7× founder, 25 years as an entrepreneur, university professor of entrepreneurship, and creator of
              the FROST framework for building a fractional firm.
            </p>
            <p style={{ marginTop: 14 }}>
              Joe founded yorCMO and the Fractional Professionals Association, the country's largest
              community of fractional executives, and serves as President of EO Nebraska. He wrote{' '}
              <em>Million Dollar Fractional Firm</em> after watching talented fractionals stay stuck as contractors
              when they had everything they needed to build a firm. FROST is the path Alliance members follow: from
              steady income, to a practice that scales, to a firm they own.
            </p>
            <blockquote className="founder-quote">
              "What you know should build something you own, in your own firm."
            </blockquote>
            <p style={{ marginTop: 22 }}><Link className="btn" href="/story#joe">More about Joe</Link></p>
          </div>
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">The path members follow</div>
            <h2>Earn. Scale. Own.</h2>
            <p className="lede">Three stages built on the five FROST pillars: Focus, Resourcing, Own Your Market, Systems and Transfer Trust. Every quarter we track income, owner delivery hours, repeatable revenue, profit and transferable assets, so you can see the firm becoming an asset.</p>
          </div>
          <div className="grid g3 eso">
            <div className="card"><span className="tag">Focus · Own Your Market</span><h3>Earn</h3><p>Build a repeatable pipeline and steady income through Cobbler, referrals and collaboration with other members.</p></div>
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
            roundtables, your directory profile and the member marketplace. {OFFERINGS.membership.price} a month,
            by application: every member is vetted through a review of their work, an interview and two references.
          </p>
          <p style={{ marginTop: 26, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn dark" href="/apply">Apply to join</Link>
            <Link className="btn outline" href="/talk">Talk to us first</Link>
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
