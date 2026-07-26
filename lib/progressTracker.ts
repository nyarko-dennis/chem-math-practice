'use client';

import { syncSession } from './supabase/sync';

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

  // Fire-and-forget cloud backup. No-ops in local-only mode; never blocks or
  // throws into the caller.
  void syncSession({
    courseId,
    type: session.type,
    correct: session.correct,
    total: session.total,
  });
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
