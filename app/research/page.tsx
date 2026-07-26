'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ResearchQuestion,
  ResearchTopic,
  TOPIC_LABELS,
  getQuestionsByTopics,
  getQuestionCountByTopic,
} from '@/lib/researchQuestions';
import {
  CalcProblem,
  generateCalcSession,
  isAnswerCorrect,
} from '@/lib/researchCalc';
import {
  DrillKind,
  DRILL_KIND_LABELS,
  ResearchDrill,
  RubricPoint,
  getDrillsByKinds,
  getDrillCountByKind,
} from '@/lib/researchDrills';
import ReviewList, { ReviewItem } from '@/components/ReviewList';
import { pickSpacedQuestions, recordAttempt } from '@/lib/practiceStats';
import { saveCourseProgress } from '@/lib/progressTracker';

type Mode = 'quick' | 'calc' | 'drill';

type SelectedTopics = Record<ResearchTopic, boolean>;
type SelectedKinds = Record<DrillKind, boolean>;

const DEFAULT_TOPICS: SelectedTopics = {
  designs: true,
  studyArea: true,
  eligibility: true,
  sampling: true,
  instruments: true,
  validityReliability: true,
  ethics: true,
  sampleSize: true,
  saturation: true,
  chapter1: true,
};

const DEFAULT_KINDS: SelectedKinds = {
  topicToObjective: true,
  mainToSpecific: true,
  so2rq: true,
  rq2so: true,
  themes: true,
  themeToLR: true,
  significance: true,
  retroVsPro: true,
  instrumentChoice: true,
  ivdv: true,
  topicComponents: true,
  problemTree: true,
  conceptualFramework: true,
  eligibility: true,
  methodsVsMethodology: true,
  samplingProcedure: true,
  ethicsWriting: true,
  validityReliabilityWriting: true,
  studyAreaWriting: true,
  trustworthiness: true,
  operationalDefinitions: true,
};

const MAX_QUICK_QUESTIONS = 200;

interface ShuffledMCQ {
  id: string;
  displayChoices: string[];
  correctDisplayIndex: number;
}

function shuffleMCQ(q: ResearchQuestion): ShuffledMCQ | null {
  if (q.type !== 'mcq') return null;
  const indexed = q.choices.map((c, i) => ({ c, i }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return {
    id: q.id,
    displayChoices: indexed.map((x) => x.c),
    correctDisplayIndex: indexed.findIndex((x) => x.i === q.correctIndex),
  };
}

export default function ResearchPage() {
  const [mode, setMode] = useState<Mode>('quick');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // quick mode
  const [topics, setTopics] = useState<SelectedTopics>(DEFAULT_TOPICS);
  const [quickCount, setQuickCount] = useState(20);
  const [questions, setQuestions] = useState<ResearchQuestion[]>([]);
  const [shuffles, setShuffles] = useState<Record<string, ShuffledMCQ>>({});
  const [qIndex, setQIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, number | boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // calc mode
  const [calcCount, setCalcCount] = useState(20);
  const [calcMix, setCalcMix] = useState({ yamane: true, cochranInfinite: true, cochranFinite: true });
  const [calcProblems, setCalcProblems] = useState<CalcProblem[]>([]);
  const [pIndex, setPIndex] = useState(0);
  const [calcInputs, setCalcInputs] = useState<Record<string, string>>({});
  const [calcSubmitted, setCalcSubmitted] = useState<Record<string, boolean>>({});

  // drill mode
  const [kinds, setKinds] = useState<SelectedKinds>(DEFAULT_KINDS);
  const [drillCount, setDrillCount] = useState(5);
  const [drills, setDrills] = useState<ResearchDrill[]>([]);
  const [dIndex, setDIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [rubricChecks, setRubricChecks] = useState<Record<string, Record<string, boolean>>>({});
  const [promptCollapsed, setPromptCollapsed] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const selectedTopicList = useMemo(
    () => (Object.keys(topics) as ResearchTopic[]).filter((t) => topics[t]),
    [topics],
  );
  const selectedKindList = useMemo(
    () => (Object.keys(kinds) as DrillKind[]).filter((k) => kinds[k]),
    [kinds],
  );

  const quickCountsByTopic = useMemo(() => getQuestionCountByTopic(), []);
  const totalQuickAvailable = useMemo(
    () => selectedTopicList.reduce((acc, t) => acc + (quickCountsByTopic[t] ?? 0), 0),
    [selectedTopicList, quickCountsByTopic],
  );

  const drillCountsByKind = useMemo(() => getDrillCountByKind(), []);
  const totalDrillsAvailable = useMemo(
    () => selectedKindList.reduce((acc, k) => acc + (drillCountsByKind[k] ?? 0), 0),
    [selectedKindList, drillCountsByKind],
  );

  // ---------- handlers ----------
  const startQuick = () => {
    if (selectedTopicList.length === 0) {
      alert('Please select at least one topic.');
      return;
    }
    const pool = getQuestionsByTopics(selectedTopicList, Number.MAX_SAFE_INTEGER);
    if (pool.length === 0) {
      alert('No questions available for the selected topics.');
      return;
    }
    // Spaced repetition: prioritize due / previously-missed / unseen questions.
    const chosen = pickSpacedQuestions('research', pool, quickCount);
    const sh: Record<string, ShuffledMCQ> = {};
    chosen.forEach((q) => {
      if (q.type === 'mcq') {
        const s = shuffleMCQ(q);
        if (s) sh[q.id] = s;
      }
    });
    setQuestions(chosen);
    setShuffles(sh);
    setQIndex(0);
    setSelections({});
    setChecked({});
    setStarted(true);
    setFinished(false);
  };

  const startCalc = () => {
    if (!calcMix.yamane && !calcMix.cochranInfinite && !calcMix.cochranFinite) {
      alert('Please select at least one formula.');
      return;
    }
    const probs = generateCalcSession(calcCount, calcMix);
    setCalcProblems(probs);
    setPIndex(0);
    setCalcInputs({});
    setCalcSubmitted({});
    setStarted(true);
    setFinished(false);
  };

  const startDrill = () => {
    if (selectedKindList.length === 0) {
      alert('Please select at least one drill type.');
      return;
    }
    const chosen = getDrillsByKinds(selectedKindList, drillCount);
    if (chosen.length === 0) {
      alert('No drills available for the selected types.');
      return;
    }
    setDrills(chosen);
    setDIndex(0);
    setDrafts({});
    setRevealed({});
    setRubricChecks({});
    setPromptCollapsed({});
    setExpanded({});
    setStarted(true);
    setFinished(false);
  };

  const checkCurrentQuick = () => {
    const q = questions[qIndex];
    if (q.id in selections) {
      setChecked({ ...checked, [q.id]: true });
      recordAttempt('research', { questionId: q.id, topicKey: q.topic, correct: isQuickCorrect(q) });
    }
  };

  const goNextQuick = () => {
    if (qIndex < questions.length - 1) setQIndex(qIndex + 1);
    else {
      const correct = questions.filter((q) => checked[q.id] && isQuickCorrect(q)).length;
      saveCourseProgress('research', { type: 'quick', correct, total: questions.length });
      setFinished(true);
    }
  };

  const isQuickCorrect = (q: ResearchQuestion): boolean => {
    const sel = selections[q.id];
    if (sel === undefined) return false;
    if (q.type === 'tf') return sel === q.correctAnswer;
    const sh = shuffles[q.id];
    return sh ? sel === sh.correctDisplayIndex : false;
  };

  const submitCalc = () => {
    const p = calcProblems[pIndex];
    setCalcSubmitted({ ...calcSubmitted, [p.id]: true });
  };

  const goNextCalc = () => {
    if (pIndex < calcProblems.length - 1) setPIndex(pIndex + 1);
    else setFinished(true);
  };

  const revealDrill = () => {
    const d = drills[dIndex];
    setRevealed({ ...revealed, [d.id]: true });
    setPromptCollapsed({ ...promptCollapsed, [d.id]: true });
  };

  const toggleRubric = (drillId: string, pointId: string) => {
    const cur = rubricChecks[drillId] ?? {};
    setRubricChecks({ ...rubricChecks, [drillId]: { ...cur, [pointId]: !cur[pointId] } });
  };

  const goNextDrill = () => {
    if (dIndex < drills.length - 1) setDIndex(dIndex + 1);
    else setFinished(true);
  };

  const drillSelfScore = (d: ResearchDrill): number => {
    const cur = rubricChecks[d.id] ?? {};
    return d.rubric.reduce((acc, r) => acc + (cur[r.id] ? r.marks : 0), 0);
  };

  const resetAll = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setShuffles({});
    setQIndex(0);
    setSelections({});
    setChecked({});
    setCalcProblems([]);
    setPIndex(0);
    setCalcInputs({});
    setCalcSubmitted({});
    setDrills([]);
    setDIndex(0);
    setDrafts({});
    setRevealed({});
    setRubricChecks({});
    setPromptCollapsed({});
    setExpanded({});
  };

  // ============================================================
  // SETUP SCREEN
  // ============================================================
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Research Methods Practice</h1>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Home</Link>
          </div>

          {/* Mode toggle */}
          <div className="grid grid-cols-3 bg-slate-100 rounded-lg p-1 mb-6">
            {(['quick', 'calc', 'drill'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-2 px-2 rounded-md text-sm font-medium transition-colors ${
                  mode === m ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {m === 'quick' ? 'Quick MCQ/TF' : m === 'calc' ? 'Sample-size' : 'Subjective'}
              </button>
            ))}
          </div>

          <p className="text-sm text-slate-500 mb-4">
            {mode === 'quick'
              ? 'MCQ and True/False questions across all Chapter 3 + Chapter 1 topics with instant feedback.'
              : mode === 'calc'
                ? 'Yamane and Cochran sample-size drills. Type the numeric answer; both the rounded-up integer and the unrounded value (±0.5) are accepted.'
                : 'Subjective drills with model answers and a self-tick rubric — topic→objective, research questions, themes, significance, IV/DV, and more.'}
          </p>

          {mode === 'quick' && (
            <>
              <div className="space-y-3 mb-6">
                {(Object.keys(TOPIC_LABELS) as ResearchTopic[]).map((t) => (
                  <label key={t} className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-slate-700 text-sm">
                      {TOPIC_LABELS[t]}
                      <span className="text-xs text-slate-400 ml-2">({quickCountsByTopic[t] ?? 0})</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={topics[t]}
                      onChange={(e) => setTopics({ ...topics, [t]: e.target.checked })}
                      className="w-5 h-5 accent-indigo-600"
                    />
                  </label>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100 mb-6">
                <label className="block font-medium text-slate-700 mb-2">Number of Questions</label>
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, Math.min(MAX_QUICK_QUESTIONS, totalQuickAvailable))}
                  value={quickCount}
                  onChange={(e) =>
                    setQuickCount(
                      Math.max(
                        1,
                        Math.min(
                          Math.max(1, Math.min(MAX_QUICK_QUESTIONS, totalQuickAvailable)),
                          parseInt(e.target.value) || 1,
                        ),
                      ),
                    )
                  }
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {totalQuickAvailable} questions available across selected topics.
                </p>
              </div>
              <button
                onClick={startQuick}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Quiz
              </button>
            </>
          )}

          {mode === 'calc' && (
            <>
              <div className="space-y-3 mb-6">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-slate-700 text-sm">
                    Yamane <span className="text-xs text-slate-400 ml-1">n = N / (1 + N·e²)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={calcMix.yamane}
                    onChange={(e) => setCalcMix({ ...calcMix, yamane: e.target.checked })}
                    className="w-5 h-5 accent-indigo-600"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-slate-700 text-sm">
                    Cochran (large/unknown N) <span className="text-xs text-slate-400 ml-1">n = Z²·p·(1−p)/d²</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={calcMix.cochranInfinite}
                    onChange={(e) => setCalcMix({ ...calcMix, cochranInfinite: e.target.checked })}
                    className="w-5 h-5 accent-indigo-600"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-slate-700 text-sm">
                    Cochran + finite-population correction
                  </span>
                  <input
                    type="checkbox"
                    checked={calcMix.cochranFinite}
                    onChange={(e) => setCalcMix({ ...calcMix, cochranFinite: e.target.checked })}
                    className="w-5 h-5 accent-indigo-600"
                  />
                </label>
              </div>
              <div className="pt-4 border-t border-slate-100 mb-6">
                <label className="block font-medium text-slate-700 mb-2">Number of Calculations</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={calcCount}
                  onChange={(e) => setCalcCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Default 20 questions (Sir Sylvester said to expect ~20 calculation items).
                </p>
              </div>
              <button
                onClick={startCalc}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Sample-size Drills
              </button>
            </>
          )}

          {mode === 'drill' && (
            <>
              <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
                {(Object.keys(DRILL_KIND_LABELS) as DrillKind[]).map((k) => (
                  <label key={k} className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-slate-700 text-sm">
                      {DRILL_KIND_LABELS[k]}
                      <span className="text-xs text-slate-400 ml-2">({drillCountsByKind[k] ?? 0})</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={kinds[k]}
                      onChange={(e) => setKinds({ ...kinds, [k]: e.target.checked })}
                      className="w-5 h-5 accent-indigo-600"
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
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {totalDrillsAvailable} drills available across selected types.
                </p>
              </div>
              <button
                onClick={startDrill}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Subjective Drills
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // FINISHED SCREENS
  // ============================================================
  if (finished) {
    if (mode === 'quick') {
      const correctCount = questions.filter((q) => checked[q.id] && isQuickCorrect(q)).length;
      const reviewItems: ReviewItem[] = questions.map((q) => {
        let yourAnswer = '';
        let correctAnswer = '';
        if (q.type === 'mcq') {
          const s = shuffles[q.id];
          correctAnswer = s ? s.displayChoices[s.correctDisplayIndex] : '';
          const sel = selections[q.id];
          yourAnswer = s && typeof sel === 'number' ? s.displayChoices[sel] : '';
        } else {
          correctAnswer = q.correctAnswer ? 'True' : 'False';
          const sel = selections[q.id];
          yourAnswer = sel === undefined ? '' : sel ? 'True' : 'False';
        }
        return {
          id: q.id,
          topicLabel: TOPIC_LABELS[q.topic],
          prompt: q.prompt,
          yourAnswer,
          correctAnswer,
          explanation: q.rationale,
          correct: !!checked[q.id] && isQuickCorrect(q),
        };
      });
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
              <div className="text-xl mb-6">
                Score: <span className="font-bold text-indigo-600">{correctCount}</span> / {questions.length}
              </div>
            </div>
            <div className="mb-6">
              <ReviewList items={reviewItems} accent="text-indigo-600" />
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
    if (mode === 'calc') {
      const correctCount = calcProblems.filter((p) => calcSubmitted[p.id] && isAnswerCorrect(p, calcInputs[p.id] ?? '')).length;
      return (
        <FinishedCard
          title="Sample-size drills complete"
          headline={`${correctCount} / ${calcProblems.length}`}
          onReset={resetAll}
        />
      );
    }
    // drill mode summary
    const totalMarks = drills.reduce((acc, d) => acc + d.marks, 0);
    const earned = drills.reduce((acc, d) => acc + drillSelfScore(d), 0);
    const pct = totalMarks > 0 ? Math.round((earned / totalMarks) * 100) : 0;
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">Subjective Drills Complete</h2>
          <p className="text-slate-500 mb-6">Self-scored — be honest with the rubric.</p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6 text-center">
            <div className="text-sm uppercase tracking-wide text-indigo-600 font-semibold mb-1">Total self-score</div>
            <div className="text-4xl font-bold text-indigo-700">{earned} / {totalMarks}</div>
            <div className="text-indigo-600 mt-1">{pct}%</div>
          </div>
          <h3 className="font-semibold text-slate-700 mb-3">By drill</h3>
          <div className="space-y-2 mb-6">
            {drills.map((d, i) => {
              const score = drillSelfScore(d);
              const passed = score >= d.marks * 0.7;
              return (
                <div key={d.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-800 text-sm">
                      Drill {i + 1} · {DRILL_KIND_LABELS[d.drillKind]}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{d.prompt.slice(0, 90).replace(/\n/g, ' ')}…</div>
                  </div>
                  <div className={`font-bold text-sm ml-3 whitespace-nowrap ${passed ? 'text-green-600' : 'text-amber-600'}`}>
                    {score} / {d.marks}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={resetAll} className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Start New Practice
            </button>
            <Link href="/" className="text-slate-500 hover:text-slate-800 text-sm text-center">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // CALC MODE — in-progress
  // ============================================================
  if (mode === 'calc') {
    const p = calcProblems[pIndex];
    const submitted = !!calcSubmitted[p.id];
    const userInput = calcInputs[p.id] ?? '';
    const correct = submitted && isAnswerCorrect(p, userInput);
    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <h1 className="font-bold text-slate-700">
              Calculation {pIndex + 1} of {calcProblems.length}
            </h1>
            <button onClick={resetAll} className="text-sm text-red-500 hover:underline">Exit</button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
            <p className="text-indigo-600 text-xs mb-3 uppercase tracking-wide font-semibold">
              {p.type === 'yamane' ? 'Yamane' : p.type === 'cochranInfinite' ? 'Cochran (large/unknown N)' : 'Cochran (finite-population correction)'}
            </p>
            <p className="text-base text-slate-800 leading-relaxed mb-4 whitespace-pre-wrap">{p.prompt}</p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 text-sm">
              <div className="font-semibold text-slate-700 mb-1">Given:</div>
              <ul className="text-slate-700 space-y-0.5">
                {p.given.map((g) => (
                  <li key={g.label} className="font-mono text-xs">{g.label} = {g.value}</li>
                ))}
              </ul>
              <div className="mt-2 text-xs text-slate-500">Formula: <span className="font-mono">{p.formula}</span></div>
            </div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Your answer (sample size n)</label>
            <input
              type="text"
              inputMode="decimal"
              disabled={submitted}
              value={userInput}
              onChange={(e) => setCalcInputs({ ...calcInputs, [p.id]: e.target.value })}
              placeholder="Enter the calculated n (round up)"
              className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-slate-50"
            />
            {submitted && (
              <div className={`mt-4 p-4 rounded-lg border ${correct ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <p className={`font-bold mb-2 ${correct ? 'text-green-700' : 'text-red-700'}`}>
                  {correct ? 'Correct!' : `Not quite — expected n ≈ ${p.roundedAnswer}`}
                </p>
                <div className="text-sm text-slate-700">
                  <div className="font-semibold mb-1">Worked steps:</div>
                  <ol className="list-decimal ml-5 space-y-0.5 font-mono text-xs leading-relaxed">
                    {p.workedSteps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              {!submitted ? (
                <button
                  onClick={submitCalc}
                  disabled={!userInput.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={goNextCalc}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                >
                  {pIndex === calcProblems.length - 1 ? 'Finish' : 'Next Calculation'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // DRILL MODE — in-progress
  // ============================================================
  if (mode === 'drill') {
    const d = drills[dIndex];
    const isRevealed = !!revealed[d.id];
    const promptIsCollapsed = !!promptCollapsed[d.id];
    const cur = rubricChecks[d.id] ?? {};
    const currentScore = drillSelfScore(d);

    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <h1 className="font-bold text-slate-700">Drill {dIndex + 1} of {drills.length}</h1>
            <button onClick={resetAll} className="text-sm text-red-500 hover:underline">Exit</button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-indigo-600 text-xs uppercase tracking-wide font-semibold">
                {DRILL_KIND_LABELS[d.drillKind]} · {d.marks} marks
              </p>
              {isRevealed && (
                <button
                  onClick={() => setPromptCollapsed({ ...promptCollapsed, [d.id]: !promptIsCollapsed })}
                  className="text-xs text-slate-500 hover:text-indigo-600"
                >
                  {promptIsCollapsed ? '▾ Show prompt' : '▴ Collapse prompt'}
                </button>
              )}
            </div>

            {!promptIsCollapsed && (
              <p className="text-base text-slate-800 leading-relaxed mb-4 whitespace-pre-wrap">{d.prompt}</p>
            )}

            {!isRevealed && (
              <>
                <label className="block text-sm font-medium text-slate-600 mb-2">Write your answer (optional)</label>
                <textarea
                  value={drafts[d.id] ?? ''}
                  onChange={(e) => setDrafts({ ...drafts, [d.id]: e.target.value })}
                  placeholder="Write a structured answer here…"
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[180px] text-sm text-slate-800"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={revealDrill}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                  >
                    Reveal Model Answer
                  </button>
                </div>
              </>
            )}
          </div>

          {isRevealed && (
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="text-xs uppercase tracking-wide text-indigo-600 font-semibold mb-2">Model answer</div>
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed">{d.modelAnswer}</pre>
              </div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">Self-score</div>
                  <div className="text-2xl font-bold text-slate-800">{currentScore} / {d.marks}</div>
                </div>
                <div className="text-xs text-slate-500 text-right">Tick each point you<br />covered in your answer.</div>
              </div>

              <div className="space-y-3 mb-6">
                {d.rubric.map((r: RubricPoint, idx) => {
                  const ticked = !!cur[r.id];
                  const detailKey = `${d.id}::${r.id}`;
                  const isExpanded = !!expanded[detailKey];
                  return (
                    <div
                      key={r.id}
                      className={`border rounded-lg transition-colors ${ticked ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}`}
                    >
                      <div className="flex items-start gap-3 p-3">
                        <input
                          type="checkbox"
                          checked={ticked}
                          onChange={() => toggleRubric(d.id, r.id)}
                          className="w-5 h-5 mt-0.5 accent-indigo-600 cursor-pointer flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-800 text-sm">{idx + 1}. {r.label}</span>
                            <span className={`text-xs font-mono font-bold ml-2 whitespace-nowrap ${ticked ? 'text-green-600' : 'text-slate-400'}`}>
                              {ticked ? `${r.marks}/${r.marks} ✓` : `0/${r.marks}`}
                            </span>
                          </div>
                          <button
                            onClick={() => setExpanded({ ...expanded, [detailKey]: !isExpanded })}
                            className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
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

              {d.referenceSections.length > 0 && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">Reference (docs/research/research.md)</div>
                  {d.referenceSections.map((s) => (
                    <div key={s} className="text-sm text-indigo-700 text-xs">→ {s}</div>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={goNextDrill}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                >
                  {dIndex === drills.length - 1 ? 'Finish Practice' : 'Next Drill'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // QUICK MODE — in-progress
  // ============================================================
  const currentQ = questions[qIndex];
  const hasChecked = !!checked[currentQ.id];
  const correct = hasChecked && isQuickCorrect(currentQ);
  const selection = selections[currentQ.id];
  const sh = currentQ.type === 'mcq' ? shuffles[currentQ.id] : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
          <h1 className="font-bold text-slate-700">Question {qIndex + 1} of {questions.length}</h1>
          <button onClick={resetAll} className="text-sm text-red-500 hover:underline">Exit Quiz</button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          <div className="mb-6">
            <p className="text-indigo-600 text-xs mb-3 uppercase tracking-wide font-semibold">
              {TOPIC_LABELS[currentQ.topic]} · {currentQ.type === 'mcq' ? 'Multiple Choice' : 'True / False'}
            </p>
            <p className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap">{currentQ.prompt}</p>
          </div>

          <div className="space-y-2 mb-6">
            {currentQ.type === 'mcq' && sh ? (
              sh.displayChoices.map((choice, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selection === idx;
                const isAnswer = idx === sh.correctDisplayIndex;
                let cls = 'w-full text-left p-3 border rounded-lg transition-colors flex items-start gap-3';
                if (hasChecked) {
                  if (isAnswer) cls += ' border-green-500 bg-green-50';
                  else if (isSelected) cls += ' border-red-500 bg-red-50';
                  else cls += ' border-slate-200 bg-white';
                } else if (isSelected) cls += ' border-indigo-500 bg-indigo-50';
                else cls += ' border-slate-200 hover:border-indigo-300 hover:bg-slate-50';
                return (
                  <button
                    key={idx}
                    disabled={hasChecked}
                    onClick={() => setSelections({ ...selections, [currentQ.id]: idx })}
                    className={cls}
                  >
                    <span className="font-bold text-slate-500 w-6">{letter}.</span>
                    <span className="flex-1 text-slate-800">{choice}</span>
                  </button>
                );
              })
            ) : (
              [{ label: 'True', value: true }, { label: 'False', value: false }].map((opt) => {
                const isSelected = selection === opt.value;
                const isAnswer = currentQ.type === 'tf' && opt.value === currentQ.correctAnswer;
                let cls = 'w-full text-left p-3 border rounded-lg transition-colors flex items-center gap-3';
                if (hasChecked) {
                  if (isAnswer) cls += ' border-green-500 bg-green-50';
                  else if (isSelected) cls += ' border-red-500 bg-red-50';
                  else cls += ' border-slate-200 bg-white';
                } else if (isSelected) cls += ' border-indigo-500 bg-indigo-50';
                else cls += ' border-slate-200 hover:border-indigo-300 hover:bg-slate-50';
                return (
                  <button
                    key={opt.label}
                    disabled={hasChecked}
                    onClick={() => setSelections({ ...selections, [currentQ.id]: opt.value })}
                    className={cls}
                  >
                    <span className="font-bold text-slate-500 w-12">{opt.label}</span>
                  </button>
                );
              })
            )}
          </div>

          {hasChecked && (
            <div className={`mb-6 p-4 rounded-lg border ${correct ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
              <p className={`font-bold mb-2 ${correct ? 'text-green-700' : 'text-red-700'}`}>{correct ? 'Correct!' : 'Incorrect'}</p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Rationale: </span>{currentQ.rationale}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!hasChecked ? (
              <button
                onClick={checkCurrentQuick}
                disabled={selection === undefined}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={goNextQuick}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
              >
                {qIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinishedCard({
  title,
  headline,
  onReset,
}: {
  title: string;
  headline: string;
  onReset: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">{title}</h2>
        <div className="text-xl mb-6">
          Score: <span className="font-bold text-indigo-600">{headline}</span>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={onReset}
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
