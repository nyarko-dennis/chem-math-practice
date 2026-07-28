'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Browser-only Supabase client.
//
// Every page in this app is a client component and all tracking happens in the
// browser, so a plain browser client (session persisted in localStorage) is all
// we need — no SSR cookie plumbing.
//
// The client is optional: if the env vars are not configured the app runs in
// "local-only" mode and every cloud helper no-ops. This keeps the app working
// unchanged until real Supabase credentials are supplied.

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  if (typeof window === 'undefined') {
    // Never instantiate during SSR; callers are all client-side.
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    cached = null;
    return cached;
  }

  cached = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // We manage the (optional) magic-link redirect ourselves.
      detectSessionInUrl: true,
    },
  });
  return cached;
}

/** True when Supabase credentials are configured and cloud features are live. */
export function isSupabaseConfigured(): boolean {
  return getSupabase() !== null;
}
