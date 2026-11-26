import { notFound } from 'next/navigation';
import ListingForm from '@/components/ListingForm';
import { requireMember } from '@/lib/auth';

export const metadata = { title: 'Edit listing' };

export default async function EditListing({ params }) {
  const { id } = await params;
  const { supabase, user } = await requireMember(`/member/listings/${id}`);
  const { data: listing } = await supabase.from('listings').select('*').eq('id', id).eq('seller_id', user.id).maybeSingle();
  if (!listing) notFound();
  return (
    <>
      <div className="page-head"><div><div className="kicker">Sell</div><h1>Edit listing</h1><p className="muted">Saving changes sends the listing back for a quick review.</p></div></div>
      <ListingForm listing={listing} />
    </>
  );
}
