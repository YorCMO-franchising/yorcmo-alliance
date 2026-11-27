import { redirect } from 'next/navigation';

// Membership is by application; keep /join working for old links.
export default function Join() {
  redirect('/apply');
}
