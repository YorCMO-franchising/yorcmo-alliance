'use server';

import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/config';
import { DEMO } from '@/lib/demo';

const clean = (fd, k, max) => String(fd.get(k) || '').trim().slice(0, max);

// "Talk to us first": save a call request for the team to follow up.
export async function requestCall(_prev, fd) {
  const row = {
    full_name: clean(fd, 'full_name', 120),
    email: clean(fd, 'email', 200).toLowerCase(),
    firm: clean(fd, 'firm', 120) || null,
    role: clean(fd, 'role', 80) || null,
    message: clean(fd, 'message', 2000) || null,
  };
  if (!row.full_name) return { error: 'Enter your name.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.email)) return { error: 'Enter a valid email address.' };
  if (fd.get('website')) return { ok: true }; // honeypot: bots fill hidden fields
  if (DEMO) return { ok: true };
  if (!supabaseConfigured) return { error: 'Requests are not switched on yet. Please check back shortly.' };
  const supabase = await createClient();
  const { error } = await supabase.from('contact_requests').insert(row);
  if (error) return { error: 'Something went wrong. Please try again.' };
  return { ok: true };
}
