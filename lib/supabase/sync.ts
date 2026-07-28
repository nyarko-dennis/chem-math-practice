'use client';

import { getSupabase } from './client';
import { ensureAnonymousSession } from './auth';

// Cloud sync for completed practice sessions.
//
// Writes are fire-and-forget: the local (localStorage) record remains the fast,
// authoritative read path for the UI, and the cloud copy is the durable,
// cross-device backup. If anything fails (offline, not configured, RLS), the
// local record is untouched and the app keeps working.

export interface SessionInsert {
  courseId: string;
  type: 'quick' | 'drill' | 'math';
  correct: number;
  total: number;
}

/** Push one completed session to Supabase. Safe to call unconditionally. */
export async function syncSession(session: SessionInsert): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    const user = await ensureAnonymousSession();
    if (!user) return;

    const { error } = await supabase.from('practice_sessions').insert({
      user_id: user.id,
      course_id: session.courseId,
      type: session.type,
      correct: session.correct,
      total: session.total,
    });
    if (error) console.warn('Session sync failed:', error.message);
  } catch (e) {
    console.warn('Session sync error:', e);
  }
}

export interface CourseAggregate {
  courseId: string;
  completedSessionsCount: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
}

/**
 * Read per-course totals for the current user from the cloud. Returns an empty
 * map in local-only mode or on error. Used to backfill the dashboard when a
 * user signs in on a new device.
 */
export async function fetchCourseAggregates(): Promise<Record<string, CourseAggregate>> {
  const supabase = getSupabase();
  if (!supabase) return {};

  try {
    const { data, error } = await supabase
      .from('practice_sessions')
      .select('course_id, correct, total');
    if (error || !data) return {};

    const out: Record<string, CourseAggregate> = {};
    for (const row of data as Array<{ course_id: string; correct: number; total: number }>) {
      const agg = (out[row.course_id] ??= {
        courseId: row.course_id,
        completedSessionsCount: 0,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
      });
      agg.completedSessionsCount += 1;
      agg.totalQuestionsAnswered += row.total;
      agg.totalCorrectAnswers += row.correct;
    }
    return out;
  } catch {
    return {};
  }
}
