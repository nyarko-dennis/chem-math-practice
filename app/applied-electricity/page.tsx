'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import CourseTabs from '@/components/CourseTabs';
import MathDisplay from '@/components/MathDisplay';
import ReviewList, { ReviewItem } from '@/components/ReviewList';
import {
  appliedElectricityQuestions,
  APPLIED_ELECTRICITY_TOPIC_LABELS,
  AppliedElectricityQuestion,
  AppliedElectricityTopic,
} from '@/lib/appliedElectricityQuestions';
import { aeDrills, AE_DRILL_LABELS, AeDrill } from '@/lib/aeDrills';
import { AE_GENERATORS, AeGeneratedQuestion } from '@/lib/aeGenerators';
import { checkAeAnswer } from '@/lib/aeAnswer';
import { pickSpacedQuestions, pickWeightedType, recordAttempt } from '@/lib/practiceStats';
import {
  saveActiveSession,
  getActiveSession,
  clearActiveSession,
  saveCourseProgress,
} from '@/lib/progressTracker';
import type { Difficulty } from '@/lib/generators';

const COURSE_ID = 'applied-electricity';

type Mode = 'practice' | 'drill';

type PracticeItem =
  | { kind: 'generated'; q: AeGeneratedQuestion }
  | { kind: 'curated'; q: AppliedElectricityQuestion };

type SelectedTopics = Record<AppliedElectricityTopic, boolean>;

const ALL_TOPICS = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS) as AppliedElectricityTopic[];

const DEFAULT_TOPICS: SelectedTopics = ALL_TOPICS.reduce((acc, t) => {
  acc[t] = true;
  return acc;
}, {} as SelectedTopics);

function shuffled<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function itemId(item: PracticeItem): string {
  return item.q.id;
}

export default function AppliedElectricityPage() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>('practice');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [canResume, setCanResume] = useState(false);
  const [resumeMode, setResumeMode] = useState<Mode | null>(null);

  // ---- Practice config ----
  const [topics, setTopics] = useState<SelectedTopics>(DEFAULT_TOPICS);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [practiceCount, setPracticeCount] = useState(10);

  // ---- Practice session ----
  const [queue, setQueue] = useState<PracticeItem[]>([]);
  const [index, setIndex] = useState(0);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [selections, setSelections] = useState<Record<string, number | boolean>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [retry, setRetry] = useState(false);

  // ---- Drill config ----
  const [drillTopics, setDrillTopics] = useState<SelectedTopics>(DEFAULT_TOPICS);
  const [drillCount, setDrillCount] = useState(6);

  // ---- Drill session ----
  const [drills, setDrills] = useState<AeDrill[]>([]);
  const [dIndex, setDIndex] = useState(0);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [rubricChecks, setRubricChecks] = useState<Record<string, Record<string, boolean>>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [scoredDrills, setScoredDrills] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    const session = getActiveSession(COURSE_ID);
    if (session && session.mode) {
      setCanResume(true);
      setResumeMode(session.mode);
    }
  }, []);

  const curatedCountByTopic = useMemo(() => {
    const counts: Partial<Record<AppliedElectricityTopic, number>> = {};
    appliedElectricityQuestions.forEach((q) => {
      counts[q.topic] = (counts[q.topic] ?? 0) + 1;
    });
    return counts;
  }, []);

  const drillCountByTopic = useMemo(() => {
    const counts: Partial<Record<AppliedElectricityTopic, number>> = {};
    aeDrills.forEach((d) => {
      counts[d.topic] = (counts[d.topic] ?? 0) + 1;
    });
    return counts;
  }, []);

  const selectedPracticeTopics = useMemo(
    () => ALL_TOPICS.filter((t) => topics[t]),
    [topics],
  );
  const selectedDrillTopics = useMemo(
    () => ALL_TOPICS.filter((t) => drillTopics[t]),
    [drillTopics],
  );
  const totalDrillsAvailable = useMemo(
    () => selectedDrillTopics.reduce((acc, t) => acc + (drillCountByTopic[t] ?? 0), 0),
    [selectedDrillTopics, drillCountByTopic],
  );

  // ---------------------------------------------------------------------
  // Resume
  // ---------------------------------------------------------------------

  const resumeSession = () => {
    const session = getActiveSession(COURSE_ID);
    if (!session) return;
    setMode(session.mode);
    if (session.mode === 'practice') {
      setTopics(session.topics ?? DEFAULT_TOPICS);
      setDifficulty(session.difficulty ?? 'medium');
      setPracticeCount(session.practiceCount ?? 10);
      setQueue(session.queue ?? []);
      setIndex(session.index ?? 0);
      setTextAnswers(session.textAnswers ?? {});
      setSelections(session.selections ?? {});
      setFeedback(session.feedback ?? {});
      setAttempts(session.attempts ?? {});
      setRetry(false);
    } else {
      setDrillTopics(session.drillTopics ?? DEFAULT_TOPICS);
      setDrillCount(session.drillCount ?? 6);
      setDrills(session.drills ?? []);
      setDIndex(session.dIndex ?? 0);
      setRevealed(session.revealed ?? {});
      setRubricChecks(session.rubricChecks ?? {});
      setExpanded(session.expanded ?? {});
      setScoredDrills(session.scoredDrills ?? {});
    }
    setStarted(true);
    setFinished(false);
    setCanResume(false);
    setResumeMode(null);
  };

  const discardSavedSession = () => {
    clearActiveSession(COURSE_ID);
    setCanResume(false);
    setResumeMode(null);
  };

  // ---------------------------------------------------------------------
  // Practice mode
  // ---------------------------------------------------------------------

  const buildPracticeQueue = (): PracticeItem[] => {
    const selected = ALL_TOPICS.filter((t) => topics[t]);
    const usedCurated = new Set<string>();
    const items: PracticeItem[] = [];
    for (let i = 0; i < practiceCount; i++) {
      const topic = pickWeightedType(COURSE_ID, selected) as AppliedElectricityTopic;
      const fullPool = appliedElectricityQuestions.filter((q) => q.topic === topic);
      const available = fullPool.filter((q) => !usedCurated.has(q.id));
      const wantCurated = Math.random() < 0.5;
      if (wantCurated && available.length > 0) {
        const [picked] = pickSpacedQuestions(COURSE_ID, available, 1);
        if (picked) {
          usedCurated.add(picked.id);
          items.push({ kind: 'curated', q: picked });
          continue;
        }
      }
      items.push({ kind: 'generated', q: AE_GENERATORS[topic](difficulty) });
    }
    return items;
  };

  const startPractice = () => {
    if (selectedPracticeTopics.length === 0) {
      alert('Please select at least one topic.');
      return;
    }
    const newQueue = buildPracticeQueue();
    setQueue(newQueue);
    setIndex(0);
    setTextAnswers({});
    setSelections({});
    setFeedback({});
    setAttempts({});
    setRetry(false);
    setMode('practice');
    setStarted(true);
    setFinished(false);
    setCanResume(false);
  };

  const currentItem = mode === 'practice' && started ? queue[index] : undefined;
  const hasAnswered = currentItem ? feedback[itemId(currentItem)] !== undefined : false;

  const canCheckPractice = (): boolean => {
    if (!currentItem) return false;
    if (currentItem.kind === 'generated') {
      return !!(textAnswers[currentItem.q.id] ?? '').trim();
    }
    return selections[currentItem.q.id] !== undefined;
  };

  const checkPractice = () => {
    if (!currentItem) return;
    if (currentItem.kind === 'generated') {
      const q = currentItem.q;
      const userInput = textAnswers[q.id] || '';
      const isCorrect = checkAeAnswer(userInput, q.answer);
      const firstTry = (attempts[q.id] ?? 0) === 0;

      // Record the first attempt only — honest first-recall for spaced repetition.
      if (firstTry) {
        recordAttempt(COURSE_ID, { topicKey: q.category, correct: isCorrect });
      }

      if (isCorrect) {
        setFeedback({ ...feedback, [q.id]: true });
        setRetry(false);
      } else if (firstTry) {
        // First miss: allow one more attempt before revealing the solution.
        setAttempts({ ...attempts, [q.id]: 1 });
        setRetry(true);
      } else {
        setFeedback({ ...feedback, [q.id]: false });
        setRetry(false);
      }
    } else {
      const q = currentItem.q;
      const sel = selections[q.id];
      const isCorrect = q.type === 'mcq' ? sel === q.correctIndex : sel === q.correctAnswer;
      recordAttempt(COURSE_ID, { questionId: q.id, topicKey: q.topic, correct: isCorrect });
      setFeedback({ ...feedback, [q.id]: isCorrect });
    }
  };

  const nextPractice = () => {
    if (index < queue.length - 1) {
      setIndex(index + 1);
      setRetry(false);
    } else {
      const correctCount = Object.values(feedback).filter(Boolean).length;
      saveCourseProgress(COURSE_ID, { type: 'quick', correct: correctCount, total: queue.length });
      clearActiveSession(COURSE_ID);
      setFinished(true);
    }
  };

  // ---------------------------------------------------------------------
  // Drill mode
  // ---------------------------------------------------------------------

  const startDrillMode = () => {
    if (selectedDrillTopics.length === 0) {
      alert('Please select at least one topic.');
      return;
    }
    const pool = aeDrills.filter((d) => selectedDrillTopics.includes(d.topic));
    if (pool.length === 0) {
      alert('No drills available for the selected topics.');
      return;
    }
    const chosen = shuffled(pool).slice(0, drillCount);
    setDrills(chosen);
    setDIndex(0);
    setRevealed({});
    setRubricChecks({});
    setExpanded({});
    setScoredDrills({});
    setMode('drill');
    setStarted(true);
    setFinished(false);
    setCanResume(false);
  };

  const revealDrill = () => {
    const d = drills[dIndex];
    setRevealed({ ...revealed, [d.id]: true });
  };

  const toggleRubric = (drillId: string, pointId: string) => {
    const cur = rubricChecks[drillId] ?? {};
    setRubricChecks({ ...rubricChecks, [drillId]: { ...cur, [pointId]: !cur[pointId] } });
  };

  const drillSelfScore = (d: AeDrill): number => {
    const cur = rubricChecks[d.id] ?? {};
    return d.rubric.reduce((acc, r) => acc + (cur[r.id] ? r.marks : 0), 0);
  };

  const nextDrill = () => {
    const d = drills[dIndex];
    if (!scoredDrills[d.id]) {
      const score = drillSelfScore(d);
      recordAttempt(COURSE_ID, { questionId: d.id, topicKey: d.topic, correct: score >= d.marks / 2 });
      setScoredDrills({ ...scoredDrills, [d.id]: true });
    }
    if (dIndex < drills.length - 1) {
      setDIndex(dIndex + 1);
    } else {
      const totalMarks = drills.reduce((acc, dr) => acc + dr.marks, 0);
      const earnedMarks = drills.reduce((acc, dr) => acc + drillSelfScore(dr), 0);
      saveCourseProgress(COURSE_ID, { type: 'drill', correct: earnedMarks, total: totalMarks });
      clearActiveSession(COURSE_ID);
      setFinished(true);
    }
  };

  // ---------------------------------------------------------------------
  // Persist in-progress session
  // ---------------------------------------------------------------------

  useEffect(() => {
    if (!started || finished) return;
    if (mode === 'practice') {
      saveActiveSession(COURSE_ID, {
        mode,
        topics,
        difficulty,
        practiceCount,
        queue,
        index,
        textAnswers,
        selections,
        feedback,
        attempts,
      });
    } else {
      saveActiveSession(COURSE_ID, {
        mode,
        drillTopics,
        drillCount,
        drills,
        dIndex,
        revealed,
        rubricChecks,
        expanded,
        scoredDrills,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    started,
    finished,
    mode,
    topics,
    difficulty,
    practiceCount,
    queue,
    index,
    textAnswers,
    selections,
    feedback,
    attempts,
    drillTopics,
    drillCount,
    drills,
    dIndex,
    revealed,
    rubricChecks,
    expanded,
    scoredDrills,
  ]);

  const resetAll = () => {
    clearActiveSession(COURSE_ID);
    setStarted(false);
    setFinished(false);
    setCanResume(false);
    setResumeMode(null);
    setQueue([]);
    setIndex(0);
    setTextAnswers({});
    setSelections({});
    setFeedback({});
    setAttempts({});
    setRetry(false);
    setDrills([]);
    setDIndex(0);
    setRevealed({});
    setRubricChecks({});
    setExpanded({});
    setScoredDrills({});
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  // ---------------------------------------------------------------------
  // CONFIG SCREEN
  // ---------------------------------------------------------------------

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <CourseTabs courseId={COURSE_ID} active="practice" />

          {canResume && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
              <div>
                <h3 className="font-semibold text-amber-800 text-sm">Session in Progress</h3>
                <p className="text-xs text-amber-700">
                  You have a saved {resumeMode === 'drill' ? 'Drill' : 'Practice'} session.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resumeSession}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors shadow-sm"
                >
                  Resume
                </button>
                <button
                  onClick={discardSavedSession}
                  className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded border border-slate-200 transition-colors"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode('practice')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'practice' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Practice
            </button>
            <button
              onClick={() => setMode('drill')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'drill' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Drill
            </button>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            {mode === 'practice'
              ? 'A mix of unlimited generated numeric problems and curated MCQ/True-False questions across all Applied Electricity topics.'
              : 'Subjective analysis/derivation drills with detailed model answers and self-scored rubrics.'}
          </p>

          {mode === 'practice' && (
            <>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                {ALL_TOPICS.map((t) => (
                  <label key={t} className="flex items-center justify-between cursor-pointer gap-3">
                    <span className="font-medium text-slate-700 text-sm">
                      {APPLIED_ELECTRICITY_TOPIC_LABELS[t]}
                      <span className="text-xs text-slate-400 ml-2">({curatedCountByTopic[t] ?? 0} curated)</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={topics[t]}
                      onChange={(e) => setTopics({ ...topics, [t]: e.target.checked })}
                      className="w-5 h-5 accent-sky-600 flex-shrink-0"
                    />
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className="block font-medium text-slate-700 mb-2">Difficulty (generated questions)</label>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium capitalize transition-colors ${
                        difficulty === d ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mb-6">
                <label className="block font-medium text-slate-700 mb-2">Number of Questions</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={practiceCount}
                  onChange={(e) =>
                    setPracticeCount(Math.min(60, Math.max(1, parseInt(e.target.value) || 10)))
                  }
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <button
                onClick={startPractice}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Practice
              </button>
            </>
          )}

          {mode === 'drill' && (
            <>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                {ALL_TOPICS.map((t) => (
                  <label key={t} className="flex items-center justify-between cursor-pointer gap-3">
                    <span className="font-medium text-slate-700 text-sm">
                      {APPLIED_ELECTRICITY_TOPIC_LABELS[t]}
                      <span className="text-xs text-slate-400 ml-2">({drillCountByTopic[t] ?? 0})</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={drillTopics[t]}
                      onChange={(e) => setDrillTopics({ ...drillTopics, [t]: e.target.checked })}
                      className="w-5 h-5 accent-sky-600 flex-shrink-0"
                    />
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 mb-6">
                <label className="block font-medium text-slate-700 mb-2">Number of Drills</label>
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, totalDrillsAvailable)}
                  value={drillCount}
                  onChange={(e) =>
                    setDrillCount(
                      Math.max(1, Math.min(Math.max(1, totalDrillsAvailable), parseInt(e.target.value) || 1)),
                    )
                  }
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {totalDrillsAvailable} drills available across selected topics.
                </p>
              </div>

              <button
                onClick={startDrillMode}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Drills
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // FINISHED SCREEN
  // ---------------------------------------------------------------------

  if (finished) {
    if (mode === 'practice') {
      const correctCount = Object.values(feedback).filter(Boolean).length;
      const reviewItems: ReviewItem[] = queue.map((item) => {
        if (item.kind === 'generated') {
          const q = item.q;
          return {
            id: q.id,
            topicLabel: APPLIED_ELECTRICITY_TOPIC_LABELS[q.category],
            prompt: q.prompt,
            promptIsLatex: true,
            yourAnswer: textAnswers[q.id] || '',
            correctAnswer: q.answerDisplay,
            answerIsLatex: true,
            explanation: q.solution,
            explanationIsLatex: true,
            correct: !!feedback[q.id],
          };
        }
        const q = item.q;
        let yourAnswer = '';
        let correctAnswer = '';
        if (q.type === 'mcq') {
          correctAnswer = q.choices[q.correctIndex];
          const sel = selections[q.id];
          yourAnswer = typeof sel === 'number' ? q.choices[sel] : '';
        } else {
          correctAnswer = q.correctAnswer ? 'True' : 'False';
          const sel = selections[q.id];
          yourAnswer = sel === undefined ? '' : sel ? 'True' : 'False';
        }
        return {
          id: q.id,
          topicLabel: APPLIED_ELECTRICITY_TOPIC_LABELS[q.topic],
          prompt: q.prompt,
          yourAnswer,
          correctAnswer,
          explanation: q.rationale,
          correct: !!feedback[q.id],
        };
      });

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">Practice Complete!</h2>
              <div className="text-xl mb-6">
                Score: <span className="font-bold text-sky-600">{correctCount}</span> / {queue.length}
              </div>
            </div>
            <div className="mb-6">
              <ReviewList items={reviewItems} accent="text-sky-600" />
            </div>
            <div className="flex flex-col gap-3 text-center">
              <button
                onClick={resetAll}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start New Practice
              </button>
              <Link href="/" className="text-slate-500 hover:text-slate-800 text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Drill finished screen
    const totalMarks = drills.reduce((acc, d) => acc + d.marks, 0);
    const earnedMarks = drills.reduce((acc, d) => acc + drillSelfScore(d), 0);
    const pct = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;

    const topicScores: Record<string, { earned: number; total: number; label: string }> = {};
    drills.forEach((d) => {
      const key = d.topic;
      if (!topicScores[key]) {
        topicScores[key] = { earned: 0, total: 0, label: APPLIED_ELECTRICITY_TOPIC_LABELS[d.topic] };
      }
      topicScores[key].earned += drillSelfScore(d);
      topicScores[key].total += d.marks;
    });
    const sortedTopics = Object.values(topicScores).sort(
      (a, b) => a.earned / a.total - b.earned / b.total,
    );

    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2 text-slate-800">Drills Complete</h2>
            <p className="text-slate-500 mb-6">Self-scored results — review the gaps honestly.</p>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mb-6 text-center">
              <div className="text-sm uppercase tracking-wide text-sky-600 font-semibold mb-1">
                Total self-score
              </div>
              <div className="text-4xl font-bold text-sky-700">
                {earnedMarks} / {totalMarks}
              </div>
              <div className="text-sky-600 mt-1">{pct}%</div>
            </div>

            <h3 className="font-semibold text-slate-700 mb-3">By drill</h3>
            <div className="space-y-2 mb-6">
              {drills.map((d, i) => {
                const score = drillSelfScore(d);
                const passed = score >= d.marks * 0.7;
                return (
                  <div
                    key={d.id}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-slate-800 text-sm">
                        Drill {i + 1} · {AE_DRILL_LABELS[d.drillKind]}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {d.prompt.slice(0, 90).replace(/\n/g, ' ')}…
                      </div>
                    </div>
                    <div
                      className={`font-bold text-sm ml-3 whitespace-nowrap ${
                        passed ? 'text-green-600' : 'text-sky-600'
                      }`}
                    >
                      {score} / {d.marks}
                    </div>
                  </div>
                );
              })}
            </div>

            {sortedTopics.length > 0 && sortedTopics[0].earned / sortedTopics[0].total < 1 && (
              <>
                <h3 className="font-semibold text-slate-700 mb-3">Where you scored lowest</h3>
                <div className="space-y-1 mb-6 text-sm text-slate-600">
                  {sortedTopics.slice(0, 3).map((t) => (
                    <div key={t.label} className="flex justify-between">
                      <span>{t.label}</span>
                      <span className="font-mono">
                        {t.earned}/{t.total} ({Math.round((t.earned / t.total) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={resetAll}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start New Practice
              </button>
              <Link href="/" className="text-slate-500 hover:text-slate-800 text-sm text-center">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // DRILL — IN PROGRESS
  // ---------------------------------------------------------------------

  if (mode === 'drill') {
    const d = drills[dIndex];
    const isRevealed = !!revealed[d.id];
    const drillChecks = rubricChecks[d.id] ?? {};
    const currentScore = drillSelfScore(d);

    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <h1 className="font-bold text-slate-700">
              Drill {dIndex + 1} of {drills.length}
            </h1>
            <button onClick={resetAll} className="text-sm text-red-500 hover:underline">
              Exit
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
            <p className="text-sky-600 text-xs uppercase tracking-wide font-semibold mb-3">
              {APPLIED_ELECTRICITY_TOPIC_LABELS[d.topic]} · {AE_DRILL_LABELS[d.drillKind]} · {d.marks} marks
            </p>

            <p className="text-base text-slate-800 leading-relaxed mb-4 whitespace-pre-wrap">{d.prompt}</p>

            {!isRevealed && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={revealDrill}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                >
                  Reveal Model Answer
                </button>
              </div>
            )}
          </div>

          {isRevealed && (
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <div className="text-xs uppercase tracking-wide text-sky-600 font-semibold mb-2">
                  Model answer
                </div>
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed">
                  {d.modelAnswer}
                </pre>
              </div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs uppercase tracking-wide text-sky-600 font-semibold">Self-score</div>
                  <div className="text-2xl font-bold text-slate-800">
                    {currentScore} / {d.marks}
                  </div>
                </div>
                <div className="text-xs text-slate-500 text-right">
                  Tick each point you covered
                  <br />
                  in your answer.
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {d.rubric.map((r, idx) => {
                  const ticked = !!drillChecks[r.id];
                  const detailKey = `${d.id}::${r.id}`;
                  const isExpanded = !!expanded[detailKey];
                  return (
                    <div
                      key={r.id}
                      className={`border rounded-lg transition-colors ${
                        ticked ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3 p-3">
                        <input
                          type="checkbox"
                          checked={ticked}
                          onChange={() => toggleRubric(d.id, r.id)}
                          className="w-5 h-5 mt-0.5 accent-sky-600 cursor-pointer flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-800 text-sm">
                              {idx + 1}. {r.label}
                            </span>
                            <span
                              className={`text-xs font-mono font-bold ml-2 whitespace-nowrap ${
                                ticked ? 'text-green-600' : 'text-slate-400'
                              }`}
                            >
                              {ticked ? `${r.marks}/${r.marks} ✓` : `0/${r.marks}`}
                            </span>
                          </div>
                          <button
                            onClick={() => setExpanded({ ...expanded, [detailKey]: !isExpanded })}
                            className="text-xs text-sky-600 hover:text-sky-800 mt-1"
                          >
                            {isExpanded ? '▴ Hide details' : '▾ Show details'}
                          </button>
                          {isExpanded && (
                            <div className="text-sm text-slate-600 mt-2 leading-relaxed bg-white p-3 rounded border border-slate-100">
                              {r.detail}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextDrill}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                >
                  {dIndex === drills.length - 1 ? 'Finish Drills' : 'Next Drill'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // PRACTICE — IN PROGRESS
  // ---------------------------------------------------------------------

  if (!currentItem) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
          <h1 className="font-bold text-slate-700">
            Question {index + 1} of {queue.length}
          </h1>
          <button onClick={resetAll} className="text-sm text-red-500 hover:underline">
            Exit Practice
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          {currentItem.kind === 'generated' ? (
            <>
              {(() => {
                const q = currentItem.q;
                return (
                  <>
                    <div className="mb-6">
                      <p className="text-slate-500 text-sm mb-2 uppercase tracking-wide font-semibold">
                        {APPLIED_ELECTRICITY_TOPIC_LABELS[q.category]}
                      </p>
                      <p className="text-lg mb-4 text-slate-800">{q.instructions}</p>
                      <div className="text-2xl text-center py-8 font-serif bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto">
                        <MathDisplay latex={q.prompt} block />
                      </div>
                    </div>

                    <div className="mb-6">
                      <input
                        type="text"
                        value={textAnswers[q.id] || ''}
                        onChange={(e) => setTextAnswers({ ...textAnswers, [q.id]: e.target.value })}
                        disabled={hasAnswered}
                        placeholder="Enter your answer (e.g. 4.5 A, 12 Ω, 3.2e-3 F)"
                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:bg-slate-100"
                      />
                      {hasAnswered && (
                        <div className={`mt-2 font-medium ${feedback[q.id] ? 'text-green-600' : 'text-red-600'}`}>
                          {feedback[q.id] ? 'Correct!' : 'Incorrect'}
                        </div>
                      )}
                      {!hasAnswered && retry && (
                        <div className="mt-2 font-medium text-amber-600">
                          Not quite — try once more before the solution shows.
                        </div>
                      )}
                    </div>

                    {hasAnswered && (
                      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-slate-700">
                        <h3 className="font-bold mb-2">Solution:</h3>
                        <p className="mb-2">
                          Correct Answer: <MathDisplay latex={q.answerDisplay} />
                        </p>
                        <div className="mt-4 pt-4 border-t border-yellow-200">
                          <MathDisplay latex={q.solution} />
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </>
          ) : (
            (() => {
              const q = currentItem.q;
              const sel = selections[q.id];
              return (
                <>
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-sky-600 text-xs uppercase tracking-wide font-semibold">
                        {APPLIED_ELECTRICITY_TOPIC_LABELS[q.topic]}
                      </span>
                      <span className="text-slate-300 text-xs">•</span>
                      <span className="text-slate-500 text-xs uppercase tracking-wide font-semibold">
                        {q.type === 'mcq' ? 'Multiple Choice' : 'True / False'}
                      </span>
                    </div>
                    <p className="text-lg text-slate-800 leading-relaxed">{q.prompt}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {q.type === 'mcq'
                      ? q.choices.map((choice, idx) => {
                          const letter = String.fromCharCode(65 + idx);
                          const isSelected = sel === idx;
                          const isAnswer = idx === q.correctIndex;
                          let cls =
                            'w-full text-left p-3 border rounded-lg transition-colors flex items-start gap-3';
                          if (hasAnswered) {
                            if (isAnswer) cls += ' border-green-500 bg-green-50';
                            else if (isSelected) cls += ' border-red-500 bg-red-50';
                            else cls += ' border-slate-200 bg-white';
                          } else if (isSelected) cls += ' border-sky-500 bg-sky-50';
                          else cls += ' border-slate-200 hover:border-sky-300 hover:bg-slate-50';
                          return (
                            <button
                              key={idx}
                              disabled={hasAnswered}
                              onClick={() => setSelections({ ...selections, [q.id]: idx })}
                              className={cls}
                            >
                              <span className="font-bold text-slate-500 w-6">{letter}.</span>
                              <span className="flex-1 text-slate-800">{choice}</span>
                            </button>
                          );
                        })
                      : [
                          { label: 'True', value: true },
                          { label: 'False', value: false },
                        ].map((opt) => {
                          const isSelected = sel === opt.value;
                          const isAnswer = opt.value === q.correctAnswer;
                          let cls =
                            'w-full text-left p-3 border rounded-lg transition-colors flex items-center gap-3';
                          if (hasAnswered) {
                            if (isAnswer) cls += ' border-green-500 bg-green-50';
                            else if (isSelected) cls += ' border-red-500 bg-red-50';
                            else cls += ' border-slate-200 bg-white';
                          } else if (isSelected) cls += ' border-sky-500 bg-sky-50';
                          else cls += ' border-slate-200 hover:border-sky-300 hover:bg-slate-50';
                          return (
                            <button
                              key={opt.label}
                              disabled={hasAnswered}
                              onClick={() => setSelections({ ...selections, [q.id]: opt.value })}
                              className={cls}
                            >
                              <span className="font-bold text-slate-500 w-12">{opt.label}</span>
                            </button>
                          );
                        })}
                  </div>

                  {hasAnswered && (
                    <div
                      className={`mb-6 p-4 rounded-lg border ${
                        feedback[q.id] ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <p className={`font-bold mb-2 ${feedback[q.id] ? 'text-green-700' : 'text-red-700'}`}>
                        {feedback[q.id] ? 'Correct!' : 'Incorrect'}
                      </p>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Rationale: </span>
                        {q.rationale}
                      </p>
                    </div>
                  )}
                </>
              );
            })()
          )}

          <div className="flex justify-end gap-3">
            {!hasAnswered ? (
              <button
                onClick={checkPractice}
                disabled={!canCheckPractice()}
                className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextPractice}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
              >
                {index === queue.length - 1 ? 'Finish Practice' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
