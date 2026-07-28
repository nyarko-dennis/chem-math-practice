'use client';

import { COURSES } from '../courses.ts';
import { loadStats, replaceStats } from '../practiceStats.ts';
import {
  getCourseProgress,
  replaceCourseProgress,
  getStreak,
  replaceStreak,
  getStateUpdatedAt,
  setStateUpdatedAt,
} from '../progressTracker.ts';
import type { PracticeState, CourseState } from './mergeState.ts';

const EMPTY_PROGRESS = {
  completedSessionsCount: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  history: [],
};

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

/** Write a merged PracticeState back into localStorage. */
export function applyToLocal(state: PracticeState): void {
  for (const [courseId, cs] of Object.entries(state.courses)) {
    replaceCourseProgress(courseId, cs.progress);
    replaceStats(courseId, cs.stats);
  }
  replaceStreak(state.streak);
  setStateUpdatedAt(state.updatedAt);
}
