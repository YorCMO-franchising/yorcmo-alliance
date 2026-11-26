import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';
import { supabaseConfigured } from './config';

// Returns { supabase, user, profile } or null when signed out.
export async function getSession() {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return { supabase, user, profile };
}

export async function requireUser(next = '/member') {
  const s = await getSession();
  if (!s) redirect(`/login?next=${encodeURIComponent(next)}`);
  return s;
}

export function isActive(profile) {
  return profile && (profile.membership_status === 'active' || profile.role === 'admin');
}

export async function requireMember(next = '/member') {
  const s = await requireUser(next);
  if (!isActive(s.profile)) redirect('/account');
  return s;
}

export async function requireAdmin() {
  const s = await requireMember('/member/admin');
  if (s.profile.role !== 'admin') redirect('/member');
  return s;
}
