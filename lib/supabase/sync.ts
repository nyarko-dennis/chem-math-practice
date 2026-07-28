'use client';

import { getSupabase } from './client';
import { getCurrentUser } from './auth';
import { snapshotLocal, applyToLocal } from './state.ts';
import { mergeState, type PracticeState } from './mergeState.ts';

// Cloud sync of the whole local practice snapshot. Writes are fire-and-forget;
// localStorage stays the authoritative read path. No-ops when unconfigured or
// signed out.

const TABLE = 'practice_state';

function meaningfulKey(s: PracticeState): string {
  return JSON.stringify({ courses: s.courses, streak: s.streak });
}

/** Upsert the current local snapshot for the signed-in user. */
export async function pushState(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const state = snapshotLocal();
    const { error } = await supabase
      .from(TABLE)
      .upsert({ user_id: user.id, state, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    if (error) console.warn('pushState failed:', error.message);
  } catch (e) {
    console.warn('pushState error:', e);
  }
}

/**
 * On sign-in: fetch the cloud snapshot, union-merge with local, write the merged
 * result to localStorage, and push it back. Returns true iff local was changed
 * (so the caller can refresh the UI). Idempotent: a second call with no remote
 * change returns false.
 */
export async function pullAndMerge(): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const { data, error } = await supabase.from(TABLE).select('state').eq('user_id', user.id).maybeSingle();
    if (error) {
      console.warn('pullAndMerge fetch failed:', error.message);
      return false;
    }

    const local = snapshotLocal();
    if (!data) {
      // No cloud row yet - first backup for this account.
      await pushState();
      return false;
    }

    const cloud = data.state as PracticeState;
    const merged = mergeState(local, cloud);
    const localChanged = meaningfulKey(merged) !== meaningfulKey(local);
    const cloudChanged = meaningfulKey(merged) !== meaningfulKey(cloud);
    if (localChanged) applyToLocal(merged);
    if (localChanged || cloudChanged) await pushState();
    return localChanged;
  } catch (e) {
    console.warn('pullAndMerge error:', e);
    return false;
  }
}
