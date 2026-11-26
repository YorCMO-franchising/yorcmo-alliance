import Link from 'next/link';
import { getSession, isActive } from '@/lib/auth';
import MenuButton from './MenuButton';

export default async function Header() {
  const session = await getSession();
  const member = session && isActive(session.profile);
  return (
    <header className="site">
      <div className="wrap">
        <Link className="brand" href="/"><b>yorCMO</b><span>Alliance</span></Link>
        <MenuButton />
        <nav className="main" id="nav">
          <Link href="/membership">Membership</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/operating-cmo">Operating CMO</Link>
          {session ? (
            <>
              <Link href={member ? '/member' : '/account'}>{member ? 'Member area' : 'My account'}</Link>
              <form action="/auth/signout" method="post" className="inline-form">
                <button className="linkish" type="submit">Sign out</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">Sign in</Link>
              <Link className="btn" href="/join">Join the Alliance</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
