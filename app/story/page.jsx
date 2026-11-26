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
                Joe Frost co-founded yorCMO to connect the two: experienced CMOs who join a leadership team for a
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
              Joe has spent 25 years building companies where trusted specialists come together to do great work,
              then go on to the next thing.
            </p>
            <p style={{ marginTop: 14 }}>
              He built HomeSmartz, a mortgage brokerage, and Frost Media Group, where two decades of film crews showed
              him how a team of specialists assembled for one project can outperform a permanent staff. Then came
              yorCMO, the Fractional Professionals Association, and Guided Outsourcing, which builds skilled global
              teams.
            </p>
            <p>
              He is a university professor of entrepreneurship, the author of <em>New Media Habits</em>, host of The
              Fractional C-Suite Retreat podcast and the weekly Cup of Joe LinkedIn Live, and a keynote speaker on the
              future of work on three continents. He lives in Omaha, Nebraska.
            </p>
            <blockquote className="founder-quote">
              "What you know should build something you own, in your own firm."
            </blockquote>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">How Joe coaches</div>
            <h2>The FROST framework</h2>
            <p className="lede">
              FROST is Joe's system for turning a fractional practice into a firm that builds equity. Alliance members
              are coached through it in three stages.
            </p>
          </div>
          <div className="grid g3 eso">
            <div className="card"><span className="tag">Earn</span><h3>Focus and Own the Room</h3><p>Pick a specialization, and find the rooms and referral partners that feed it. Goal: a repeatable pipeline and steady income.</p></div>
            <div className="card"><span className="tag">Scale</span><h3>Resources and System</h3><p>The people, processes and technology that make your outcomes repeatable. Goal: delivery that doesn't need you in every meeting.</p></div>
            <div className="card"><span className="tag">Own</span><h3>Trust Transfer</h3><p>Remove the dependency on you, so clients trust the firm, not just the founder. Goal: a practice that builds equity over time.</p></div>
          </div>
          <p style={{ marginTop: 24 }}>
            Learn more at <a href={FROST_SITE}>frost-framework.com</a> and <a href={JOE_SITE}>josephmarkfrost.com</a>.
          </p>
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
