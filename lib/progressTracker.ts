'use client';

import { pushState } from './supabase/sync';

export interface SessionHistoryItem {
  date: string;
  type: 'quick' | 'drill' | 'math';
  correct: number;
  total: number;
}

export interface CourseProgress {
  completedSessionsCount: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  history: SessionHistoryItem[];
}

const PROGRESS_KEY_PREFIX = 'chem_math_practice_progress_';
const ACTIVE_SESSION_KEY_PREFIX = 'chem_math_practice_active_';
const STREAK_KEY = 'chem_math_practice_streak';
const STATE_UPDATED_AT_KEY = 'chem_math_practice_state_updated_at';
const OWNER_KEY = 'chem_math_practice_owner';

export interface StreakInfo {
  current: number;
  longest: number;
  lastDate: string; // YYYY-MM-DD (local)
}

function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Returns the current daily-practice streak, decayed to 0 if a day was missed. */
export function getStreak(): StreakInfo {
  const empty: StreakInfo = { current: 0, longest: 0, lastDate: '' };
  if (typeof window === 'undefined') return empty;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return empty;
    const s = JSON.parse(raw) as StreakInfo;
    // If the last practice was before yesterday, the current streak is broken.
    const today = localDateKey(new Date());
    const yesterday = localDateKey(new Date(Date.now() - 86400000));
    if (s.lastDate !== today && s.lastDate !== yesterday) {
      return { current: 0, longest: s.longest ?? 0, lastDate: s.lastDate ?? '' };
    }
    return s;
  } catch {
    return empty;
  }
}

/** Read the local "state last changed" timestamp (ms epoch); 0 if never set. */
export function getStateUpdatedAt(): number {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(STATE_UPDATED_AT_KEY);
  return raw ? Number(raw) || 0 : 0;
}

/** Set the local "state last changed" timestamp. */
export function setStateUpdatedAt(ts: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATE_UPDATED_AT_KEY, String(ts));
  } catch {
    /* ignore quota errors */
  }
}

/** The user id whose data currently populates localStorage, or null. */
export function getStateOwner(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(OWNER_KEY);
}

/** Mark localStorage as owned by a user id. */
export function setStateOwner(userId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OWNER_KEY, userId);
  } catch {
    /* ignore */
  }
}

/** Overwrite a course's progress record (used by cloud restore). */
export function replaceCourseProgress(courseId: string, progress: CourseProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${PROGRESS_KEY_PREFIX}${courseId}`, JSON.stringify(progress));
  } catch (e) {
    console.error('Error replacing course progress:', e);
  }
}

/** Overwrite the streak record (used by cloud restore). */
export function replaceStreak(streak: StreakInfo): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  } catch (e) {
    console.error('Error replacing streak:', e);
  }
}

/** Remove the streak record. Used when switching accounts. */
export function clearStreak(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STREAK_KEY);
  } catch {
    /* ignore */
  }
}

/** Record that the user practiced today, advancing or resetting the streak. */
export function recordPracticeDay(): void {
  if (typeof window === 'undefined') return;
  try {
    const today = localDateKey(new Date());
    const yesterday = localDateKey(new Date(Date.now() - 86400000));
    const raw = localStorage.getItem(STREAK_KEY);
    const prev: StreakInfo = raw
      ? (JSON.parse(raw) as StreakInfo)
      : { current: 0, longest: 0, lastDate: '' };

    if (prev.lastDate === today) return; // already counted today

    const current = prev.lastDate === yesterday ? prev.current + 1 : 1;
    const longest = Math.max(prev.longest ?? 0, current);
    localStorage.setItem(STREAK_KEY, JSON.stringify({ current, longest, lastDate: today }));
  } catch (e) {
    console.error('Error recording practice day:', e);
  }
}

/**
 * Saves overall statistics/progress history for a completed session of a course.
 */
export function saveCourseProgress(
  courseId: string,
  session: Omit<SessionHistoryItem, 'date'>
) {
  if (typeof window === 'undefined') return;

  try {
    const key = `${PROGRESS_KEY_PREFIX}${courseId}`;
    const raw = localStorage.getItem(key);
    let progress: CourseProgress = raw
      ? JSON.parse(raw)
      : { completedSessionsCount: 0, totalQuestionsAnswered: 0, totalCorrectAnswers: 0, history: [] };

    const newItem: SessionHistoryItem = {
      date: new Date().toLocaleDateString(),
      type: session.type,
      correct: session.correct,
      total: session.total,
    };

    progress.completedSessionsCount += 1;
    progress.totalQuestionsAnswered += session.total;
    progress.totalCorrectAnswers += session.correct;
    progress.history.push(newItem);

    // Keep history bounded to last 50 sessions to save space
    if (progress.history.length > 50) {
      progress.history.shift();
    }

    localStorage.setItem(key, JSON.stringify(progress));
    recordPracticeDay();
  } catch (e) {
    console.error('Error saving course progress:', e);
  }

  // Bump the local state timestamp and back the whole snapshot up to the cloud.
  // No-ops when signed out or unconfigured; never blocks or throws into caller.
  setStateUpdatedAt(Date.now());
  void pushState();
}

/**
 * Gets the overall progress statistics for a course.
 */
export function getCourseProgress(courseId: string): CourseProgress | null {
  if (typeof window === 'undefined') return null;

  try {
    const key = `${PROGRESS_KEY_PREFIX}${courseId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error getting course progress:', e);
    return null;
  }
}

/**
 * Clears all progress history for a course.
 */
export function clearCourseProgress(courseId: string) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(`${PROGRESS_KEY_PREFIX}${courseId}`);
  } catch (e) {
    console.error('Error clearing course progress:', e);
  }
}

/**
 * Saves the active (in-progress) session state for a course.
 */
export function saveActiveSession(courseId: string, state: any) {
  if (typeof window === 'undefined') return;

  try {
    const key = `${ACTIVE_SESSION_KEY_PREFIX}${courseId}`;
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving active session:', e);
  }
}

/**
 * Gets the active (in-progress) session state for a course.
 */
export function getActiveSession(courseId: string): any | null {
  if (typeof window === 'undefined') return null;

  try {
    const key = `${ACTIVE_SESSION_KEY_PREFIX}${courseId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error getting active session:', e);
    return null;
  }
}

/**
 * Clears the active session state for a course.
 */
export function clearActiveSession(courseId: string) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(`${ACTIVE_SESSION_KEY_PREFIX}${courseId}`);
  } catch (e) {
    console.error('Error clearing active session:', e);
  }
}

/**
 * Checks if a course has an active (in-progress) session.
 */
export function hasActiveSession(courseId: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const key = `${ACTIVE_SESSION_KEY_PREFIX}${courseId}`;
    return localStorage.getItem(key) !== null;
  } catch (e) {
    return false;
  }
}
