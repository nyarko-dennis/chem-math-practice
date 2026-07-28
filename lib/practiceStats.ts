'use client';

/**
 * Per-question and per-topic practice statistics with a lightweight
 * spaced-repetition (Leitner) scheduler.
 *
 * Two kinds of content are tracked:
 *  - Curated bank questions (stable `id`)  -> per-question Leitner boxes.
 *  - Generated questions (no stable id)    -> per-topic/type accuracy only,
 *                                             used to weight which type is
 *                                             generated next (weakness targeting).
 *
 * All storage is localStorage, namespaced per course. The scheduling/selection
 * logic is kept as pure functions (rng + now injectable) so it can be unit
 * tested without a browser.
 */

export interface QuestionStat {
  box: number; // Leitner box, 1..MAX_BOX
  seen: number;
  correct: number;
  lastSeen: number; // ms epoch
  dueAt: number; // ms epoch when the question becomes due again
  lastCorrect: boolean;
}

export interface TopicStat {
  seen: number;
  correct: number;
}

export interface CoursePracticeStats {
  questions: Record<string, QuestionStat>;
  topics: Record<string, TopicStat>;
}

const STATS_KEY_PREFIX = 'chem_practice_stats_';

const DAY_MS = 24 * 60 * 60 * 1000;
export const MAX_BOX = 5;

// Interval (in ms) added when a question reaches a given box, indexed by box.
// Box 1 is due immediately (just answered wrong or brand new), higher boxes
// wait progressively longer.
const BOX_INTERVAL_MS: number[] = [
  0, // unused index 0
  0, // box 1 -> due now
  1 * DAY_MS, // box 2
  3 * DAY_MS, // box 3
  7 * DAY_MS, // box 4
  16 * DAY_MS, // box 5
];

// ---------------------------------------------------------------------------
// Pure scheduling logic
// ---------------------------------------------------------------------------

export function emptyStats(): CoursePracticeStats {
  return { questions: {}, topics: {} };
}

function boxInterval(box: number): number {
  const b = Math.max(1, Math.min(MAX_BOX, box));
  return BOX_INTERVAL_MS[b];
}

/** Apply a single attempt result to a question stat, returning the new stat. */
export function applyResult(
  prev: QuestionStat | undefined,
  correct: boolean,
  now: number,
): QuestionStat {
  const box = prev ? prev.box : 1;
  const nextBox = correct ? Math.min(MAX_BOX, box + 1) : 1;
  return {
    box: nextBox,
    seen: (prev ? prev.seen : 0) + 1,
    correct: (prev ? prev.correct : 0) + (correct ? 1 : 0),
    lastSeen: now,
    dueAt: now + boxInterval(nextBox),
    lastCorrect: correct,
  };
}

/**
 * Selection weight for a single question. Higher weight = more likely to be
 * chosen for a session. Recently-missed and never-seen questions rank highest;
 * mastered-and-not-due questions keep a small non-zero weight so nothing is
 * ever fully abandoned.
 */
export function questionWeight(stat: QuestionStat | undefined, now: number): number {
  if (!stat) return 6; // never seen -> introduce it
  const due = stat.dueAt <= now;
  if (!due) return 1; // mastered / not yet due -> occasional review
  if (stat.box <= 1) return 10; // recently wrong -> highest priority
  return Math.max(2, 9 - stat.box); // due, higher boxes slightly lower
}

/**
 * Weighted sample of `count` items without replacement.
 * Pure: pass an rng returning [0,1). Preserves natural order among equal draws
 * only incidentally — callers should not rely on ordering.
 */
export function weightedSample<T>(
  items: T[],
  weightOf: (item: T) => number,
  count: number,
  rng: () => number,
): T[] {
  const pool = items.map((item) => ({ item, w: Math.max(0, weightOf(item)) }));
  const result: T[] = [];
  const n = Math.min(count, pool.length);
  for (let k = 0; k < n; k++) {
    let total = 0;
    for (const p of pool) total += p.w;
    let idx = 0;
    if (total <= 0) {
      idx = Math.floor(rng() * pool.length);
    } else {
      let r = rng() * total;
      for (let i = 0; i < pool.length; i++) {
        r -= pool[i].w;
        if (r <= 0) {
          idx = i;
          break;
        }
      }
    }
    result.push(pool[idx].item);
    pool.splice(idx, 1);
  }
  return result;
}

/** Spaced-repetition-weighted selection over a pool of identified questions. */
export function selectSpaced<T extends { id: string }>(
  pool: T[],
  stats: CoursePracticeStats,
  count: number,
  now: number,
  rng: () => number = Math.random,
): T[] {
  return weightedSample(pool, (q) => questionWeight(stats.questions[q.id], now), count, rng);
}

/**
 * Choose one topic/type key, weighting toward weaker (lower-accuracy) and
 * unseen keys. Used for generated content where individual questions aren't
 * tracked but their type is.
 */
export function weightedTypePick(
  keys: string[],
  stats: CoursePracticeStats,
  rng: () => number = Math.random,
): string {
  const picked = weightedSample(
    keys,
    (key) => {
      const t = stats.topics[key];
      if (!t || t.seen === 0) return 3; // explore unseen types
      const accuracy = t.correct / t.seen;
      return 1 + (1 - accuracy) * 4; // 1 (mastered) .. 5 (always wrong)
    },
    1,
    rng,
  );
  return picked[0] ?? keys[0];
}

// ---------------------------------------------------------------------------
// localStorage-backed API
// ---------------------------------------------------------------------------

export function loadStats(courseId: string): CoursePracticeStats {
  if (typeof window === 'undefined') return emptyStats();
  try {
    const raw = localStorage.getItem(`${STATS_KEY_PREFIX}${courseId}`);
    if (!raw) return emptyStats();
    const parsed = JSON.parse(raw) as Partial<CoursePracticeStats>;
    return {
      questions: parsed.questions ?? {},
      topics: parsed.topics ?? {},
    };
  } catch {
    return emptyStats();
  }
}

function saveStats(courseId: string, stats: CoursePracticeStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STATS_KEY_PREFIX}${courseId}`, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving practice stats:', e);
  }
}

/** Overwrite the stored stats for a course. Used by cloud restore. */
export function replaceStats(courseId: string, stats: CoursePracticeStats): void {
  saveStats(courseId, stats);
}

/** Remove all stored stats for a course. Used when switching accounts. */
export function clearStats(courseId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STATS_KEY_PREFIX}${courseId}`);
  } catch {
    /* ignore */
  }
}

export interface AttemptRecord {
  /** Stable question id, when the content is a curated bank item. */
  questionId?: string;
  /** Topic / type / category key for weakness aggregation. */
  topicKey: string;
  correct: boolean;
}

/** Record one attempt: updates topic aggregates and (if id given) the Leitner box. */
export function recordAttempt(courseId: string, attempt: AttemptRecord): void {
  const stats = loadStats(courseId);
  const now = Date.now();

  const t = stats.topics[attempt.topicKey] ?? { seen: 0, correct: 0 };
  t.seen += 1;
  if (attempt.correct) t.correct += 1;
  stats.topics[attempt.topicKey] = t;

  if (attempt.questionId) {
    stats.questions[attempt.questionId] = applyResult(
      stats.questions[attempt.questionId],
      attempt.correct,
      now,
    );
  }

  saveStats(courseId, stats);
}

/** Pick `count` questions from `pool` using spaced repetition (browser entry point). */
export function pickSpacedQuestions<T extends { id: string }>(
  courseId: string,
  pool: T[],
  count: number,
): T[] {
  const stats = loadStats(courseId);
  return selectSpaced(pool, stats, count, Date.now());
}

/** Pick one weakness-weighted type key (browser entry point). */
export function pickWeightedType(courseId: string, keys: string[]): string {
  const stats = loadStats(courseId);
  return weightedTypePick(keys, stats);
}

export interface TopicMastery {
  key: string;
  seen: number;
  correct: number;
  accuracy: number; // 0..1, 0 when unseen
}

export interface MasteryBreakdown {
  learning: number; // boxes 1-2
  reviewing: number; // boxes 3-4
  mastered: number; // box 5
  total: number;
}

/** Group a course's tracked questions into learning / reviewing / mastered. */
export function getMasteryBreakdown(courseId: string): MasteryBreakdown {
  const stats = loadStats(courseId);
  let learning = 0;
  let reviewing = 0;
  let mastered = 0;
  for (const id in stats.questions) {
    const box = stats.questions[id].box;
    if (box >= 5) mastered++;
    else if (box >= 3) reviewing++;
    else learning++;
  }
  return { learning, reviewing, mastered, total: learning + reviewing + mastered };
}

/** Count questions currently due for review (dueAt in the past) for a course. */
export function countDueQuestions(courseId: string): number {
  const stats = loadStats(courseId);
  const now = Date.now();
  let due = 0;
  for (const id in stats.questions) {
    if (stats.questions[id].dueAt <= now) due++;
  }
  return due;
}

/** Per-topic accuracy summary for analytics, sorted weakest-first. */
export function getTopicMastery(courseId: string): TopicMastery[] {
  const stats = loadStats(courseId);
  return Object.entries(stats.topics)
    .map(([key, t]) => ({
      key,
      seen: t.seen,
      correct: t.correct,
      accuracy: t.seen > 0 ? t.correct / t.seen : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.seen - a.seen);
}
