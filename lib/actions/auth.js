'use server';

import { createClient } from '@/lib/supabase/server';
import { SITE_URL, supabaseConfigured } from '@/lib/config';

// Email a one-time sign-in link.
export async function sendMagicLink(_prev, formData) {
  if (!supabaseConfigured) return { error: 'Sign-in is not switched on yet.' };
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const next = String(formData.get('next') || '/member');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Enter a valid email address.' };
  const supabase = await createClient();
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/member';
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${SITE_URL}/auth/callback?next=${encodeURIComponent(safeNext)}` },
  });
  if (error) return { error: 'We could not send the link. Wait a minute and try again.' };
  return { sent: email };
}
