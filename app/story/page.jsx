import Link from 'next/link';
import { FROST_SITE, JOE_PHOTO, JOE_SITE } from '@/lib/founder';

export const metadata = {
  title: 'Our story',
  description: 'How yorCMO started in 2016, what ten years of fractional CMOs taught us, and why Joe Frost built the Alliance.',
};

export default function Story() {
  return (
    <>
      <section className="hero page-hero">
        <div className="wrap">
          <div className="kicker">Our story</div>
          <h1>We spent ten years helping CMOs go fractional. <em>Now we help them own what they build.</em></h1>
        </div>
      </section>

      <section className="white">
        <div className="wrap story">
          <div className="chapter">
            <div className="when">2016</div>
            <div>
              <h2>The bet</h2>
              <p>
                Growing companies need senior marketing leadership long before they can justify a full-time CMO. And
                many of the best CMOs don't want to give one company all of their time.
              </p>
              <p>
                Joe Frost founded yorCMO to connect the two: experienced CMOs who join a leadership team for a
                fraction of the time, and stay accountable for the results every week.
              </p>
              <p>
                To make the work repeatable, we built a shared system, the <strong>6 Fundamentals of Marketing</strong>,
                so every CMO ran the same proven playbook, and every owner knew what they were getting.
              </p>
            </div>
          </div>

          <div className="chapter">
            <div className="when">The first decade</div>
            <div>
              <h2>From going fractional to building practices</h2>
              <p>
                At first, the job was helping great CMOs become fractional. Then it became helping fractional CMOs
                build successful practices. More than 25 CMOs have run the 6 Fundamentals for more than 100
                companies.
              </p>
              <p>
                Joe saw that fractional leaders had nowhere to find each other, so he founded the Fractional
                Professionals Association, a community for fractional executives across marketing, finance, sales,
                operations and technology.
              </p>
              <p>
                And the support we gave our CMOs grew up too. It started as a concierge service: a coordinator, a
                shared plan, and a weekly rhythm. It became <strong>CORE</strong>, a marketing operating system that
                runs a client's marketing week after week.
              </p>
            </div>
          </div>

          <div className="chapter">
            <div className="when">What we learned</div>
            <div>
              <h2>Two problems that wouldn't go away</h2>
              <p>
                <strong>Pipeline.</strong> The work was excellent; finding the next client wasn't. As one CMO put it
                to us: "I don't have a pipeline. That's the biggest issue." Many had done unpaid work for referral
                partners and still never ended up in front of buyers.
              </p>
              <p>
                <strong>Value that walks out the door.</strong> Every company that hires a CMO counts on their
                expertise to build value in its business. When the CMO stops showing up, the pay stops, and the
                systems, the team and the know-how stay behind. The CMO builds equity for everyone but themselves.
              </p>
              <p>
                Owners have the mirror image of the problem. When the person running marketing leaves, marketing
                starts over. We call it the marketing reset.
              </p>
            </div>
          </div>

          <div className="chapter">
            <div className="when">Today</div>
            <div>
              <h2>The Alliance</h2>
              <p>
                So we're spending the next decade on a different goal: helping fractional executives become
                <strong> equity executives</strong>, leaders who build firms with their own clients, their own
                intellectual property, and delivery that doesn't depend on their calendar.
              </p>
              <p>
                The Alliance puts leads first, with a book, speaking and a community that put members in rooms owners
                already trust. It gives members leverage through Cobbler and CORE, and a marketplace to sell what they
                know to each other.
              </p>
              <dl className="statements light">
                <dt>PURPOSE</dt><dd>Create wealth for marketing entrepreneurs.</dd>
                <dt>VISION</dt><dd>Become the most trusted platform for building independently owned marketing enterprises.</dd>
                <dt>MISSION</dt><dd>Multiply the expertise of exceptional marketing leaders through collective leverage.</dd>
                <dt>PROMISE</dt><dd>Earn today. Scale tomorrow. Own the upside.</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="dark" id="joe">
        <div className="wrap founder">
          <img className="founder-photo" src={JOE_PHOTO} alt="Joe Frost" width="320" height="320" />
          <div>
            <div className="kicker">Founder and coach</div>
            <h2>Meet Joe Frost</h2>
            <p className="lede" style={{ color: '#dfe5ee' }}>
              A 7× founder, Joe has spent 25 years as an entrepreneur, building companies where trusted specialists
              come together to do great work.
            </p>
            <p style={{ marginTop: 14 }}>
              He built HomeSmartz, a mortgage brokerage that thrived on distributed trust, and Frost Media Group, where
              two decades of film crews (specialists assembled for the project, trusted with their craft, dissolved at
              the wrap) showed him the original decentralized workforce. Then came yorCMO, the Fractional
              Professionals Association, the country's largest community of fractional executives, and Guided
              Outsourcing, which builds skilled global teams.
            </p>
            <p>
              An MBA with a background in chemical engineering, Joe is a university professor of entrepreneurship,
              President of Entrepreneurs' Organization (EO) Nebraska, and a keynote speaker on the future of work on
              three continents. He hosts The Fractional C-Suite Retreat podcast, with 85+ episodes, and the weekly Cup
              of Joe on LinkedIn Live. He wrote <em>New Media Habits</em> and <em>Million Dollar Fractional Firm</em>,
              the complete FROST framework. Friends call him "Omaha Joe."
            </p>
            <blockquote className="founder-quote">
              "You are not built to have one boss. You are built to have many."
            </blockquote>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Why Joe built FROST</div>
            <h2>Most fractionals accidentally rebuild the job they escaped.</h2>
            <p className="lede">
              Running a fractional CMO firm, Joe watched talented executives leave corporate for freedom, then become
              the chief problem-solver, the inbox hostage, the scope-creep sponge. Not because they lacked skill, but
              because no one gave them a system. He traced it to five distractions.
            </p>
          </div>
          <ol className="distractions">
            <li><strong>Chasing leads instead of building lead sources.</strong> Pros don't chase leads. Pros build faucets.</li>
            <li><strong>Fighting scope creep instead of monetizing it.</strong> When extra work appears, bring in a partner and profit.</li>
            <li><strong>Selling agnostic instead of specializing.</strong> Generalists grind. Specialists scale.</li>
            <li><strong>Maximizing income instead of optimizing ROI.</strong> The goal is not to work more. It's to earn smarter.</li>
            <li><strong>Trading hours instead of building equity.</strong> Most fractionals sell the one thing they cannot scale: their own time.</li>
          </ol>
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">How Joe coaches</div>
            <h2>The FROST framework</h2>
            <p className="lede">
              FROST is Joe's strategy system for fractional executives who are ready to stop being contractors and
              start being firm owners. In the Alliance, members work through it in three stages: Earn, Scale, Own.
            </p>
          </div>
          <div className="frost-grid">
            {[
              ['F', 'Focus', 'The first domino', 'Earn', 'Specialize, sharpen your message, and choose the niche you can dominate. Your niche isn\'t a limitation; it\'s the lever that makes you impossible to ignore.'],
              ['R', 'Resourcing', 'The engine of scale', 'Scale', 'Build your bench: team, peers, partners, vendors and lead sources. Do only what only you can do. Everything else is a resourcing decision.'],
              ['O', 'Own Your Market', 'Authority over attention', 'Earn', 'Become the category-of-one in your niche with a signature framework, offer and content. You don\'t win because you\'re talented. You win because you\'re known.'],
              ['S', 'Systems', 'Built to scale without you', 'Scale', 'Workflows, SOPs, evergreen engines and AI workers, so you shift from operator to owner. Your future firm is human, outsourced and AI.'],
              ['T', 'Transfer Trust', 'From person to platform', 'Own', 'Move trust from you, to your systems, to your team, to your firm, until the business is an asset you could sell.'],
            ].map(([l, name, sub, stage, body]) => (
              <div className="card frost-card" key={l}>
                <div className="frost-letter">{l}</div>
                <span className="tag">{stage}</span>
                <h3>{name}</h3>
                <div className="small muted" style={{ marginBottom: 8 }}>{sub}</div>
                <p className="small">{body}</p>
              </div>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 32 }}>
            <strong>FROST is the blueprint. The Alliance is where you build it.</strong> Members get the coaching, the
            community and the leverage to put FROST to work in their own firm. Want to go deeper on your own? Joe's
            book, course, workshop and 1:1 coaching are at <a href={FROST_SITE}>frost-framework.com</a>. More about Joe
            at <a href={JOE_SITE}>josephmarkfrost.com</a>.
          </div>
        </div>
      </section>

      <section className="dark center">
        <div className="wrap manifesto">
          <div className="kicker">The Fractional Firm Manifesto</div>
          <h2>We are not freelancers. We are firm owners.</h2>
          <ul>
            <li>We do not sell hours. We sell outcomes.</li>
            <li>We do not chase clients. We attract them.</li>
            <li>We do not compete on price. We compete on authority.</li>
            <li>We do not build dependency. We build transferable trust.</li>
            <li>We do not just earn income. We build equity.</li>
          </ul>
          <p className="quote" style={{ margin: '28px auto 0', fontSize: 26 }}>Let's build something that <em>outlives us</em>.</p>
        </div>
      </section>

      <section className="white">
        <div className="wrap split">
          <div>
            <div className="kicker">What's next</div>
            <h2>Foundation First</h2>
            <p className="lede">
              Ten years of the 6 Fundamentals, in a book written for business owners. It gives them two paths: do it
              themselves, or bring in a CMO to help.
            </p>
            <p style={{ marginTop: 14 }}>
              Foundation First launches at the yorCMO Summit and ten-year celebration in Dallas, March 14–16, 2027.
              Alliance members take part in the book campaign and use it to open doors with prospects and referral
              partners.
            </p>
          </div>
          <div className="card center">
            <h3>Help us write the next ten years.</h3>
            <p>The Alliance is for marketing leaders who are ready to stop competing on hours and start building something they own.</p>
            <p style={{ marginTop: 20 }}><Link className="btn dark block" href="/join">Join the Alliance</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
