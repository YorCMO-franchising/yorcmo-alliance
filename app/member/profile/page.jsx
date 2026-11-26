import ProfileForm from '@/components/ProfileForm';
import { requireMember } from '@/lib/auth';

export const metadata = { title: 'My profile' };

export default async function Profile({ searchParams }) {
  const sp = await searchParams;
  const { profile, user } = await requireMember('/member/profile');
  return (
    <>
      {sp?.welcome && <div className="alert ok">Welcome to the Alliance! Start by completing your profile. It's how other members find you.</div>}
      <div className="page-head"><div><div className="kicker">Directory</div><h1>My profile</h1><p className="muted">Visible to other active members. Signed in as {user.email}.</p></div></div>
      <ProfileForm p={profile} />
    </>
  );
}
