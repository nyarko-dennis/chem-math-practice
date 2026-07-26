'use client';

import { useEffect } from 'react';
import { ensureAnonymousSession } from '@/lib/supabase/auth';

/**
 * Mounted once at the app root. Silently establishes an anonymous Supabase
 * session (Option A) so practice sessions can be stored and scoped by RLS.
 * Renders nothing and no-ops in local-only mode.
 */
export default function SessionBootstrap() {
  useEffect(() => {
    void ensureAnonymousSession();
  }, []);
  return null;
}
