import Link from 'next/link';

export const metadata = { title: 'The Operating CMO' };

export default function OperatingCMO() {
  return (
    <>
      <section className="hero page-hero">
        <div className="wrap">
          <div className="kicker">A new category</div>
          <h1>Not a better fractional. <em>A different job.</em></h1>
          <p className="lede">Fractional is how much of a CMO you buy. Operating is what that CMO does: own the decisions, build the team and the system, and answer for the work every week.</p>
        </div>
      </section>
      <section className="white">
        <div className="wrap split">
          <div>
            <div className="kicker">The owner's problem</div>
            <h2>The marketing reset.</h2>
            <p className="lede">Marketing starts over when the person running it leaves. Most owners can tell you how many times it's happened.</p>
            <p style={{ marginTop: 16 }}>Ending it takes a leader at the table, systems that hold the work, and execution that runs every week. That's the Operating CMO™.</p>
          </div>
          <div className="grid">
            <div className="card"><span className="tag">01</span><h3>A leader at the table</h3><p>Owns the decisions and answers for the results.</p></div>
            <div className="card"><span className="tag">02</span><h3>Systems that hold the work</h3><p>The 6 Fundamentals of Marketing, so the work outlasts any one person.</p></div>
            <div className="card"><span className="tag">03</span><h3>Execution every week</h3><p>The team and the cadence that keep marketing moving.</p></div>
          </div>
        </div>
      </section>
      <section className="dark">
        <div className="wrap">
          <p className="quote">We were never really fractional. We sat at the leadership table. We built the systems. We showed up every week. <em>We were Operating CMOs™ all along.</em></p>
        </div>
      </section>
      <section className="center">
        <div className="wrap">
          <h2>This isn't for everyone.</h2>
          <p className="lede">It's for CMOs ready to stop competing on hours and price and start leading. If that's you, come help us write the rules.</p>
          <p style={{ marginTop: 26 }}><Link className="btn dark" href="/join">Join the Alliance</Link></p>
        </div>
      </section>
    </>
  );
}
