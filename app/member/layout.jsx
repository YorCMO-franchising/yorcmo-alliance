import SideNav from '@/components/SideNav';
import { requireMember } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function MemberLayout({ children }) {
  const { supabase, profile } = await requireMember('/member');
  let pending = 0;
  let applications = 0;
  if (profile.role === 'admin') {
    const [{ count: l }, { count: a }] = await Promise.all([
      supabase.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'submitted'),
    ]);
    pending = l || 0;
    applications = a || 0;
  }
  return (
    <div className="shell">
      <SideNav admin={profile.role === 'admin'} pending={pending} applications={applications} />
      <main className="content">{children}</main>
    </div>
  );
}
