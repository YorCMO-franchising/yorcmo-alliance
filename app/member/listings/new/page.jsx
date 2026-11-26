import ListingForm from '@/components/ListingForm';

export const metadata = { title: 'Create a listing' };

export default function NewListing() {
  return (
    <>
      <div className="page-head"><div><div className="kicker">Sell</div><h1>Create a listing</h1><p className="muted">Tell members what you offer. yorCMO reviews each listing before it goes live.</p></div></div>
      <ListingForm />
    </>
  );
}
