'use client';

import type { User } from '@supabase/supabase-js';
import { getSupabase } from './client';

// Sign-up-only email + password identity. Confirm-email is OFF in the dashboard,
// so signUp/signIn return a live session immediately - no email, no redirect.

export interface AccountState {
  user: User | null;
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function signUp(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Cloud sync is not configured.' };
  const { error } = await supabase.auth.signUp({ email: email.trim(), password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Cloud sync is not configured.' };
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Subscribe to auth changes. Returns an unsubscribe function. */
export function onAccountChange(cb: (state: AccountState) => void): () => void {
  const supabase = getSupabase();
  if (!supabase) {
    cb({ user: null });
    return () => {};
  }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb({ user: session?.user ?? null });
  });
  return () => data.subscription.unsubscribe();
}
