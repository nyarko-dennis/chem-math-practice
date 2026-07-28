// Pure union-merge of two PracticeState snapshots. No I/O, no localStorage - so
// it is unit-testable under `node --test`. Type imports are erased by type
// stripping, so this module has no runtime dependencies.

import type { CoursePracticeStats } from '../practiceStats';
import type { CourseProgress, StreakInfo, SessionHistoryItem } from '../progressTracker';

export interface CourseState {
  progress: CourseProgress;
  stats: CoursePracticeStats;
}

export interface PracticeState {
  version: 1;
  updatedAt: number;
  courses: Record<string, CourseState>;
  streak: StreakInfo;
}

const HISTORY_CAP = 50;

function mergeHistory(a: SessionHistoryItem[], b: SessionHistoryItem[]): SessionHistoryItem[] {
  const seen = new Set<string>();
  const out: SessionHistoryItem[] = [];
  for (const item of [...a, ...b]) {
    const key = `${item.date}|${item.type}|${item.correct}|${item.total}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out.slice(-HISTORY_CAP);
}

function mergeCourse(
  local: CourseState | undefined,
  cloud: CourseState | undefined,
  localNewer: boolean,
): CourseState {
  if (!local) return cloud as CourseState;
  if (!cloud) return local;

  // Counters: take the whole triple from the side with more completed sessions
  // (tie -> newer snapshot). Taking it as a unit never double-counts shared
  // sessions and keeps the triple internally consistent.
  const localMore =
    local.progress.completedSessionsCount > cloud.progress.completedSessionsCount ||
    (local.progress.completedSessionsCount === cloud.progress.completedSessionsCount && localNewer);
  const base = localMore ? local.progress : cloud.progress;

  const progress: CourseProgress = {
    completedSessionsCount: base.completedSessionsCount,
    totalQuestionsAnswered: base.totalQuestionsAnswered,
    totalCorrectAnswers: base.totalCorrectAnswers,
    history: mergeHistory(local.progress.history, cloud.progress.history),
  };

  // Spaced-repetition boxes are point-in-time and not additive: newest wins.
  const stats = localNewer ? local.stats : cloud.stats;

  return { progress, stats };
}

export function mergeState(local: PracticeState, cloud: PracticeState): PracticeState {
  const localNewer = local.updatedAt >= cloud.updatedAt;
  const ids = new Set([...Object.keys(local.courses), ...Object.keys(cloud.courses)]);
  const courses: Record<string, CourseState> = {};
  for (const id of ids) {
    courses[id] = mergeCourse(local.courses[id], cloud.courses[id], localNewer);
  }

  const longest = Math.max(local.streak.longest, cloud.streak.longest);
  const streak: StreakInfo =
    local.streak.lastDate >= cloud.streak.lastDate
      ? { ...local.streak, longest }
      : { ...cloud.streak, longest };

  return {
    version: 1,
    updatedAt: Math.max(local.updatedAt, cloud.updatedAt),
    courses,
    streak,
  };
}
