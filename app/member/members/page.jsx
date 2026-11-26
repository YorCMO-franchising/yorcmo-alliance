import { requireMember } from '@/lib/auth';
import { REFERRAL_TERMS } from '@/lib/config';

export const metadata = { title: 'Members' };

export default async function Members({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === 'string' ? sp.q.trim().slice(0, 80) : '';
  const { supabase, user } = await requireMember('/member/members');
  let query = supabase.from('profiles')
    .select('id, email, full_name, firm, title, city, niche, bio, website, linkedin')
    .eq('membership_status', 'active').eq('directory_visible', true).order('full_name').limit(500);
  if (q) {
    const safe = q.replace(/[%,()]/g, ' ');
    query = query.or(`full_name.ilike.%${safe}%,firm.ilike.%${safe}%,city.ilike.%${safe}%,bio.ilike.%${safe}%`);
  }
  const { data: members } = await query;
  return (
    <>
      <div className="page-head"><div><div className="kicker">Directory</div><h1>Members</h1><p className="muted">{REFERRAL_TERMS}</p></div></div>
      <form className="mk-tools" method="get">
        <input type="search" name="q" defaultValue={q} placeholder="Search by name, firm, city or expertise…" aria-label="Search members" />
        <button className="btn dark" type="submit">Search</button>
      </form>
      <div className="mk-grid">
        {members?.length ? members.map((m) => (
          <article className="card listing" key={m.id} id={`m-${m.id}`}>
            <div className="person">
              <div className="avatar">{(m.full_name || m.email).split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()}</div>
              <div><h3>{m.full_name || m.email}{m.id === user.id ? ' (you)' : ''}</h3><div className="small muted">{[m.title, m.firm].filter(Boolean).join(', ')}{m.city ? ` · ${m.city}` : ''}</div></div>
            </div>
            {m.bio && <p className="small">{m.bio.length > 260 ? m.bio.slice(0, 257) + '…' : m.bio}</p>}
            {m.niche?.length > 0 && <div className="chips">{m.niche.map((n) => <span className="chip" key={n}>{n}</span>)}</div>}
            <div className="meta">
              <div className="actions small">
                {m.website && <a href={m.website} target="_blank" rel="noopener noreferrer">Website</a>}
                {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              </div>
              {m.id !== user.id && <a className="btn sm dark" href={`mailto:${m.email}`}>Email</a>}
            </div>
          </article>
        )) : <div className="empty">{q ? 'No members match that search.' : 'No members in the directory yet.'}</div>}
      </div>
    </>
  );
}
