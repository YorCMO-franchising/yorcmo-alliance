import Link from 'next/link';
import { ADD_ONS, CATEGORIES, OFFERINGS, REFERRAL_TERMS, supabaseConfigured } from '@/lib/config';
import { createAdminClient } from '@/lib/supabase/admin';

export const metadata = { title: 'Marketplace' };
export const revalidate = 300;

async function liveCounts() {
  if (!supabaseConfigured || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    const db = createAdminClient();
    const [{ count: listings }, { count: members }] = await Promise.all([
      db.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
      db.from('profiles').select('id', { count: 'exact', head: true }).eq('membership_status', 'active'),
    ]);
    return { listings: listings || 0, members: members || 0 };
  } catch {
    return null;
  }
}

const CATEGORY_HELP = {
  service: 'Specialist services members deliver for each other or each other\'s clients.',
  capacity: 'Trusted hands to take on delivery so you can step out of the calendar.',
  core: 'Niche COREs built by members for a vertical, ready to run with clients.',
  ip: 'Playbooks, frameworks and workshops you can license instead of rebuilding.',
  product: 'Templates, tools and assets that save hours.',
};

export default async function Marketplace() {
  const counts = await liveCounts();
  return (
    <>
      <section className="hero page-hero">
        <div className="wrap">
          <div className="kicker">The member marketplace</div>
          <h1>Sell what you know. Buy the capacity you need.</h1>
          <p className="lede">A members-only market where Alliance members sell services, delivery capacity, playbooks and niche COREs to each other.</p>
          <div className="ctas">
            <Link className="btn" href="/join">Join to buy and sell</Link>
            <Link className="btn ghost" href="/login?next=/member/marketplace">Members: sign in</Link>
          </div>
        </div>
      </section>

      {counts && (counts.listings > 0 || counts.members > 0) && (
        <section style={{ padding: '36px 0 0' }}>
          <div className="wrap stat-row">
            <div className="stat"><div className="n">{counts.members}</div><div className="l">Active members</div></div>
            <div className="stat"><div className="n">{counts.listings}</div><div className="l">Live listings</div></div>
            <div className="stat"><div className="n">20% / 10%</div><div className="l">Suggested referral share</div></div>
          </div>
        </section>
      )}

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">What members list</div>
            <h2>Five kinds of listings.</h2>
          </div>
          <div className="grid g3">
            {Object.entries(CATEGORY_HELP).map(([k, v]) => (
              <div className="card" key={k}><span className="tag">{CATEGORIES[k]}</span><p>{v}</p></div>
            ))}
            <div className="card" style={{ background: 'var(--navy)', color: '#c7d0dd', border: 0 }}>
              <span className="tag" style={{ color: 'var(--accent)' }}>Your listing</span>
              <p>Members create listings from the member area. Each is reviewed before it goes live.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">How it works</div>
            <h2>List, connect, agree, deliver.</h2>
          </div>
          <div className="grid g4">
            <div className="card"><span className="tag">1</span><h3>List</h3><p>Describe your offer, set a price or take quotes.</p></div>
            <div className="card"><span className="tag">2</span><h3>Review</h3><p>yorCMO reviews each listing before it goes live.</p></div>
            <div className="card"><span className="tag">3</span><h3>Connect</h3><p>Members contact you through the marketplace. You see every inquiry in your inbox.</p></div>
            <div className="card"><span className="tag">4</span><h3>Agree</h3><p>Buyer and seller agree scope and terms directly. {REFERRAL_TERMS}</p></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">From yorCMO</div>
            <h2>CORE and shared services for members.</h2>
            <p className="lede">Bought from the member area and billed monthly. Each is optional and separately cancellable.</p>
          </div>
          <div className="grid g3">
            {ADD_ONS.map((k) => (
              <div className="card" key={k}>
                <span className="tag">{OFFERINGS[k].price} {OFFERINGS[k].unit}</span>
                <h3>{OFFERINGS[k].name}</h3>
                <p>{OFFERINGS[k].summary}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 30 }}><Link className="btn dark" href="/join">Join the Alliance</Link></p>
        </div>
      </section>
    </>
  );
}
