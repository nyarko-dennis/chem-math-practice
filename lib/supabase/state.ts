'use client';

import { COURSES } from '../courses.ts';
import { loadStats, replaceStats, clearStats } from '../practiceStats.ts';
import {
  getCourseProgress,
  replaceCourseProgress,
  clearCourseProgress,
  getStreak,
  replaceStreak,
  clearStreak,
  getStateUpdatedAt,
  setStateUpdatedAt,
  type CourseProgress,
} from '../progressTracker.ts';
import type { PracticeState, CourseState } from './mergeState.ts';

const EMPTY_PROGRESS: CourseProgress = {
  completedSessionsCount: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  history: [],
};

const EMPTY_STREAK = { current: 0, longest: 0, lastDate: '' };

/** An empty practice state (older than any cloud row). */
export function emptyState(): PracticeState {
  return { version: 1, updatedAt: 0, courses: {}, streak: EMPTY_STREAK };
}

/** Read the full local practice state from localStorage into a PracticeState. */
export function snapshotLocal(): PracticeState {
  const courses: Record<string, CourseState> = {};
  for (const c of COURSES) {
    const progress = getCourseProgress(c.id);
    const stats = loadStats(c.id);
    const hasProgress = !!progress && (progress.completedSessionsCount > 0 || progress.history.length > 0);
    const hasStats = Object.keys(stats.questions).length > 0 || Object.keys(stats.topics).length > 0;
    if (hasProgress || hasStats) {
      courses[c.id] = { progress: progress ?? { ...EMPTY_PROGRESS }, stats };
    }
  }
  return { version: 1, updatedAt: getStateUpdatedAt(), courses, streak: getStreak() };
}

/**
 * Replace local practice state with this snapshot: write the courses present in
 * the snapshot and clear any course that is not, so applying another account's
 * (or an empty) snapshot never leaves the previous owner's courses behind.
 */
export function applyToLocal(state: PracticeState): void {
  for (const c of COURSES) {
    const cs = state.courses[c.id];
    if (cs) {
      replaceCourseProgress(c.id, cs.progress);
      replaceStats(c.id, cs.stats);
    } else {
      clearCourseProgress(c.id);
      clearStats(c.id);
    }
  }
  replaceStreak(state.streak);
  setStateUpdatedAt(state.updatedAt);
}
