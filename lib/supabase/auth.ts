'use client';

import type { User } from '@supabase/supabase-js';
import { getSupabase } from './client';

// Identity helpers.
//
//   * ensureAnonymousSession() — Option A. Called once on app load; gives the
//     visitor a real (anonymous) auth user so their sessions can be stored and
//     scoped by RLS. Requires "Allow anonymous sign-ins" enabled in the
//     Supabase dashboard (Authentication → Providers → Anonymous).
//
//   * upgradeOrSignIn(email) — Option B. If the current user is anonymous we
//     attach an email to it (upgrade in place — the uid is preserved, so all
//     history carries over). Otherwise we send a normal magic-link sign-in.
//     Either way the user clicks the emailed link to finish.

export interface AccountState {
  /** The signed-in user, or null in local-only mode / before bootstrap. */
  user: User | null;
  /** True when the user has no email attached yet (anonymous device identity). */
  isAnonymous: boolean;
}

export function accountFromUser(user: User | null): AccountState {
  return {
    user,
    // Supabase marks anonymous users with is_anonymous; fall back to "no email".
    isAnonymous: !!user && ((user.is_anonymous ?? !user.email) as boolean),
  };
}

/**
 * Ensure a session exists, creating an anonymous one if needed.
 * No-ops (returns null) in local-only mode or if anonymous sign-ins are off.
 */
export async function ensureAnonymousSession(): Promise<User | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) return session.user;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    // Most common cause: anonymous sign-ins not enabled in the dashboard.
    console.warn('Anonymous sign-in unavailable:', error.message);
    return null;
  }
  return data.user ?? null;
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Attach an email to an anonymous user (upgrade) or start a magic-link sign-in.
 * The user completes the flow by clicking the link in their inbox.
 */
export async function upgradeOrSignIn(email: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Cloud sync is not configured.' };

  const trimmed = email.trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }

  const emailRedirectTo =
    typeof window !== 'undefined' ? window.location.origin : undefined;

  const { data: { user } } = await supabase.auth.getUser();

  if (user && (user.is_anonymous ?? !user.email)) {
    // Upgrade the anonymous account in place — preserves the uid and history.
    const { error } = await supabase.auth.updateUser({ email: trimmed });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  // Returning permanent user signing in on a new device.
  const { error } = await supabase.auth.signInWithOtp({
    email: trimmed,
    options: { emailRedirectTo },
  });
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
    cb({ user: null, isAnonymous: false });
    return () => {};
  }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(accountFromUser(session?.user ?? null));
  });
  return () => data.subscription.unsubscribe();
}
