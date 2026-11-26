import SideNav from '@/components/SideNav';
import { requireMember } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function MemberLayout({ children }) {
  const { supabase, profile } = await requireMember('/member');
  let pending = 0;
  if (profile.role === 'admin') {
    const { count } = await supabase.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'pending');
    pending = count || 0;
  }
  return (
    <div className="shell">
      <SideNav admin={profile.role === 'admin'} pending={pending} />
      <main className="content">{children}</main>
    </div>
  );
}
