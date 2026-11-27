'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['Dashboard', '/member', true],
  ['Marketplace', '/member/marketplace'],
  ['My listings', '/member/listings'],
  ['Inbox', '/member/inbox'],
  ['Members', '/member/members'],
  ['My profile', '/member/profile'],
];

export default function SideNav({ admin, pending, applications }) {
  const path = usePathname();
  const cur = (href, exact) => (exact ? path === href : path.startsWith(href)) ? 'page' : undefined;
  return (
    <nav className="side" aria-label="Member area">
      <div className="label">Member area</div>
      {LINKS.map(([label, href, exact]) => (
        <Link key={href} href={href} aria-current={cur(href, exact)}>{label}</Link>
      ))}
      <Link href="/account" aria-current={cur('/account')}>Billing</Link>
      {admin && (
        <>
          <div className="label">Admin</div>
          <Link href="/member/admin/applications" aria-current={cur('/member/admin/applications')}>Applications{applications ? ` (${applications})` : ''}</Link>
          <Link href="/member/admin" aria-current={path === '/member/admin' ? 'page' : undefined}>Review listings{pending ? ` (${pending})` : ''}</Link>
        </>
      )}
    </nav>
  );
}
