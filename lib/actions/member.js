'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin, requireMember } from '@/lib/auth';
import { CATEGORIES, PRICING_MODELS } from '@/lib/config';

const text = (fd, k, max) => String(fd.get(k) || '').trim().slice(0, max);
const list = (fd, k) => text(fd, k, 400).split(',').map((s) => s.trim()).filter(Boolean).slice(0, 12);
const url = (v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v) || null;

export async function saveProfile(_prev, fd) {
  const { supabase, user } = await requireMember('/member/profile');
  const { error } = await supabase.from('profiles').update({
    full_name: text(fd, 'full_name', 120) || null,
    firm: text(fd, 'firm', 120) || null,
    title: text(fd, 'title', 120) || null,
    city: text(fd, 'city', 120) || null,
    niche: list(fd, 'niche'),
    bio: text(fd, 'bio', 2000) || null,
    website: url(text(fd, 'website', 300)),
    linkedin: url(text(fd, 'linkedin', 300)),
    directory_visible: fd.get('directory_visible') === 'on',
  }).eq('id', user.id);
  if (error) return { error: 'Could not save your profile. Please try again.' };
  revalidatePath('/member', 'layout');
  return { ok: 'Profile saved.' };
}

function listingFields(fd) {
  const category = text(fd, 'category', 20);
  const pricing_model = text(fd, 'pricing_model', 20);
  const raw = text(fd, 'price', 20).replace(/[$,\s]/g, '');
  const price = raw === '' ? null : Number(raw);
  const errors = [];
  const title = text(fd, 'title', 120);
  const summary = text(fd, 'summary', 280);
  if (title.length < 3) errors.push('Add a title (at least 3 characters).');
  if (summary.length < 10) errors.push('Add a short summary (at least 10 characters).');
  if (!CATEGORIES[category]) errors.push('Choose a category.');
  if (!PRICING_MODELS[pricing_model]) errors.push('Choose how it is priced.');
  if (pricing_model !== 'quote' && (price == null || !Number.isFinite(price) || price < 0)) errors.push('Enter a price, or choose "Request a quote".');
  return {
    errors,
    row: {
      title, summary, category, pricing_model,
      description: text(fd, 'description', 6000) || null,
      price_cents: pricing_model === 'quote' || price == null ? null : Math.round(price * 100),
      tags: list(fd, 'tags'),
    },
  };
}

export async function saveListing(_prev, fd) {
  const id = text(fd, 'id', 64);
  const { supabase, user } = await requireMember('/member/listings');
  const { errors, row } = listingFields(fd);
  if (errors.length) return { error: errors.join(' ') };
  const q = id
    ? supabase.from('listings').update(row).eq('id', id).eq('seller_id', user.id)
    : supabase.from('listings').insert({ ...row, seller_id: user.id });
  const { error } = await q;
  if (error) return { error: 'Could not save the listing. Please try again.' };
  revalidatePath('/member/listings');
  redirect('/member/listings?saved=1');
}

export async function setListingArchived(fd) {
  const { supabase, user } = await requireMember('/member/listings');
  const archive = fd.get('archive') === '1';
  await supabase.from('listings').update({ status: archive ? 'archived' : 'pending' })
    .eq('id', text(fd, 'id', 64)).eq('seller_id', user.id);
  revalidatePath('/member/listings');
}

export async function deleteListing(fd) {
  const { supabase, user } = await requireMember('/member/listings');
  await supabase.from('listings').delete().eq('id', text(fd, 'id', 64)).eq('seller_id', user.id);
  revalidatePath('/member/listings');
}

export async function sendInquiry(_prev, fd) {
  const { supabase, user, profile } = await requireMember('/member/marketplace');
  const listingId = text(fd, 'listing_id', 64);
  const message = text(fd, 'message', 4000);
  if (message.length < 5) return { error: 'Write a short message to the seller.' };
  const { data: listing } = await supabase.from('listings').select('id, seller_id').eq('id', listingId).single();
  if (!listing) return { error: 'This listing is no longer available.' };
  if (listing.seller_id === user.id) return { error: 'This is your own listing.' };
  const { error } = await supabase.from('inquiries').insert({
    listing_id: listing.id, buyer_id: user.id, seller_id: listing.seller_id, message,
    buyer_email: user.email, buyer_name: profile.full_name || null,
  });
  if (error) return { error: 'Could not send your message. Please try again.' };
  revalidatePath('/member/inbox');
  return { ok: 'Sent. The seller sees your message and email in their inbox.' };
}

export async function reviewListing(fd) {
  const { supabase } = await requireAdmin();
  const decision = fd.get('decision');
  if (!['approved', 'rejected'].includes(decision)) return;
  await supabase.from('listings').update({
    status: decision,
    review_note: text(fd, 'note', 500) || null,
  }).eq('id', text(fd, 'id', 64));
  revalidatePath('/member/admin');
  revalidatePath('/member/marketplace');
}
