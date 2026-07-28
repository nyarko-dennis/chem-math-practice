'use client';

import { getSupabase } from './client';
import { getCurrentUser } from './auth';
import { snapshotLocal, applyToLocal, emptyState } from './state.ts';
import { getStateOwner, setStateOwner } from '../progressTracker.ts';
import { mergeState, snapshotSignature, type PracticeState } from './mergeState.ts';

// Cloud sync of the whole local practice snapshot. Writes are fire-and-forget;
// localStorage stays the authoritative read path. No-ops when unconfigured or
// signed out.

const TABLE = 'practice_state';

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
 * (so the caller can refresh the UI). Idempotent: a second call with no change
 * returns false.
 *
 * Account isolation: if localStorage currently belongs to a different user
 * (owner mismatch), the device's local data is NOT merged into this account —
 * only this account's cloud state is restored, and the previous owner's data is
 * cleared. This prevents one account's practice from bleeding into another's on
 * a shared device.
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

    const owner = getStateOwner();
    const ownerMismatch = !!owner && owner !== user.id;
    const onDiskKey = snapshotSignature(snapshotLocal());
    // Local data only counts toward the merge when it belongs to this account.
    const localForMerge = ownerMismatch ? emptyState() : snapshotLocal();

    if (!data) {
      if (ownerMismatch) {
        applyToLocal(emptyState()); // clear the other account's data
        setStateOwner(user.id);
        return snapshotSignature(emptyState()) !== onDiskKey;
      }
      await pushState(); // first backup for this account
      setStateOwner(user.id);
      return false;
    }

    const cloud = data.state as PracticeState;
    const merged = mergeState(localForMerge, cloud);
    const localChanged = snapshotSignature(merged) !== onDiskKey;
    const cloudChanged = snapshotSignature(merged) !== snapshotSignature(cloud);
    if (localChanged) applyToLocal(merged);
    setStateOwner(user.id);
    if (localChanged || cloudChanged) await pushState();
    return localChanged;
  } catch (e) {
    console.warn('pullAndMerge error:', e);
    return false;
  }
}
