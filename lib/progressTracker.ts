'use client';

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
  } catch (e) {
    console.error('Error saving course progress:', e);
  }
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
