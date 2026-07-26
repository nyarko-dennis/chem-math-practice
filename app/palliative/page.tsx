'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PalliativeQuestion,
  PalliativeTopic,
  TOPIC_LABELS,
  getQuestionsByTopics,
} from '@/lib/palliativeQuestions';
import {
  CaseQuestion,
  RubricPoint,
  getCasesByTopics,
  getCaseCountByTopic,
} from '@/lib/palliativeCases';
import ReviewList, { ReviewItem } from '@/components/ReviewList';
import { pickSpacedQuestions, recordAttempt } from '@/lib/practiceStats';
import { saveCourseProgress } from '@/lib/progressTracker';

type Mode = 'quick' | 'case';
type SelectedTopics = Record<PalliativeTopic, boolean>;

const DEFAULT_TOPICS: SelectedTopics = {
  foundations: true,
  hospiceModels: true,
  ethics: true,
  painConcept: true,
  painAssessment: true,
  painManagement: true,
  dying: true,
  communication: true,
  grief: true,
  special: true,
};

const MAX_QUICK_QUESTIONS = 225;

interface ShuffledMCQ {
  id: string;
  displayChoices: string[];
  correctDisplayIndex: number;
}

function shuffleMCQ(q: PalliativeQuestion): ShuffledMCQ | null {
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

export default function PalliativePage() {
  // shared
  const [mode, setMode] = useState<Mode>('quick');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [topics, setTopics] = useState<SelectedTopics>(DEFAULT_TOPICS);

  // quick-mode state
  const [quickCount, setQuickCount] = useState(15);
  const [questions, setQuestions] = useState<PalliativeQuestion[]>([]);
  const [shuffles, setShuffles] = useState<Record<string, ShuffledMCQ>>({});
  const [qIndex, setQIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, number | boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // case-mode state
  const [caseCount, setCaseCount] = useState(3);
  const [cases, setCases] = useState<CaseQuestion[]>([]);
  const [cIndex, setCIndex] = useState(0);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [rubricChecks, setRubricChecks] = useState<Record<string, Record<string, boolean>>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [promptCollapsed, setPromptCollapsed] = useState<Record<string, boolean>>({});

  const selectedTopicList = useMemo(
    () => (Object.keys(topics) as PalliativeTopic[]).filter((t) => topics[t]),
    [topics],
  );

  const caseCountsByTopic = useMemo(() => getCaseCountByTopic(), []);
  const totalCasesAvailable = useMemo(
    () => selectedTopicList.reduce((acc, t) => acc + (caseCountsByTopic[t] ?? 0), 0),
    [selectedTopicList, caseCountsByTopic],
  );

  // ---------- quick mode handlers ----------
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
    const chosen = pickSpacedQuestions('palliative', pool, quickCount);
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

  const checkCurrentQuick = () => {
    const q = questions[qIndex];
    if (q.id in selections) {
      setChecked({ ...checked, [q.id]: true });
      recordAttempt('palliative', { questionId: q.id, topicKey: q.topic, correct: isQuickCorrect(q) });
    }
  };

  const goNextQuick = () => {
    if (qIndex < questions.length - 1) setQIndex(qIndex + 1);
    else {
      const correct = questions.filter((q) => checked[q.id] && isQuickCorrect(q)).length;
      saveCourseProgress('palliative', { type: 'quick', correct, total: questions.length });
      setFinished(true);
    }
  };

  const isQuickCorrect = (q: PalliativeQuestion): boolean => {
    const selection = selections[q.id];
    if (selection === undefined) return false;
    if (q.type === 'tf') return selection === q.correctAnswer;
    const sh = shuffles[q.id];
    return sh ? selection === sh.correctDisplayIndex : false;
  };

  // ---------- case mode handlers ----------
  const startCase = () => {
    if (selectedTopicList.length === 0) {
      alert('Please select at least one topic.');
      return;
    }
    const chosen = getCasesByTopics(selectedTopicList, caseCount);
    if (chosen.length === 0) {
      alert('No cases available for the selected topics.');
      return;
    }
    setCases(chosen);
    setCIndex(0);
    setRevealed({});
    setRubricChecks({});
    setDrafts({});
    setExpanded({});
    setPromptCollapsed({});
    setStarted(true);
    setFinished(false);
  };

  const revealCurrent = () => {
    const c = cases[cIndex];
    setRevealed({ ...revealed, [c.id]: true });
    setPromptCollapsed({ ...promptCollapsed, [c.id]: true });
  };

  const toggleRubricPoint = (caseId: string, pointId: string) => {
    const caseChecks = rubricChecks[caseId] ?? {};
    setRubricChecks({
      ...rubricChecks,
      [caseId]: { ...caseChecks, [pointId]: !caseChecks[pointId] },
    });
  };

  const toggleExpanded = (key: string) => {
    setExpanded({ ...expanded, [key]: !expanded[key] });
  };

  const goNextCase = () => {
    if (cIndex < cases.length - 1) setCIndex(cIndex + 1);
    else setFinished(true);
  };

  const caseSelfScore = (c: CaseQuestion): number => {
    const caseChecks = rubricChecks[c.id] ?? {};
    return c.rubric.reduce(
      (acc, r) => acc + (caseChecks[r.id] ? r.marks : 0),
      0,
    );
  };

  const resetAll = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setShuffles({});
    setQIndex(0);
    setSelections({});
    setChecked({});
    setCases([]);
    setCIndex(0);
    setRevealed({});
    setRubricChecks({});
    setDrafts({});
    setExpanded({});
    setPromptCollapsed({});
  };

  // ============================================================
  // SETUP SCREEN
  // ============================================================
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Palliative Care Practice</h1>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Home</Link>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode('quick')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'quick'
                  ? 'bg-white text-violet-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Quick Practice
            </button>
            <button
              onClick={() => setMode('case')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'case'
                  ? 'bg-white text-violet-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Case Practice
            </button>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            {mode === 'quick'
              ? 'MCQ and True/False questions with instant feedback.'
              : 'Long-form case studies with model answers and self-scored rubrics.'}
          </p>

          {/* Topic checkboxes */}
          <div className="space-y-3 mb-6">
            {(Object.keys(TOPIC_LABELS) as PalliativeTopic[]).map((t) => (
              <label key={t} className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-slate-700">
                  {TOPIC_LABELS[t]}
                  {mode === 'case' && (
                    <span className="text-xs text-slate-400 ml-2">
                      ({caseCountsByTopic[t] ?? 0} cases)
                    </span>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={topics[t]}
                  onChange={(e) => setTopics({ ...topics, [t]: e.target.checked })}
                  className="w-5 h-5 accent-violet-600"
                />
              </label>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 mb-6">
            <label className="block font-medium text-slate-700 mb-2">
              Number of {mode === 'quick' ? 'Questions' : 'Cases'}
            </label>
            {mode === 'quick' ? (
              <>
                <input
                  type="number"
                  min={1}
                  max={MAX_QUICK_QUESTIONS}
                  value={quickCount}
                  onChange={(e) =>
                    setQuickCount(Math.max(1, Math.min(MAX_QUICK_QUESTIONS, parseInt(e.target.value) || 1)))
                  }
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Up to {MAX_QUICK_QUESTIONS} unique questions available.
                </p>
              </>
            ) : (
              <>
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, totalCasesAvailable)}
                  value={caseCount}
                  onChange={(e) =>
                    setCaseCount(
                      Math.max(1, Math.min(Math.max(1, totalCasesAvailable), parseInt(e.target.value) || 1)),
                    )
                  }
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {totalCasesAvailable} cases available across selected topics.
                </p>
              </>
            )}
          </div>

          <button
            onClick={mode === 'quick' ? startQuick : startCase}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start {mode === 'quick' ? 'Quiz' : 'Case Practice'}
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // FINISHED SCREEN
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
                Score: <span className="font-bold text-violet-600">{correctCount}</span> / {questions.length}
              </div>
            </div>
            <div className="mb-6">
              <ReviewList items={reviewItems} accent="text-violet-600" />
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

    // case-mode summary
    const totalMarks = cases.reduce((acc, c) => acc + c.marks, 0);
    const earnedMarks = cases.reduce((acc, c) => acc + caseSelfScore(c), 0);
    const pct = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;

    // weakest topics
    const topicScores: Record<string, { earned: number; total: number; label: string }> = {};
    cases.forEach((c) => {
      const key = c.topic;
      if (!topicScores[key]) {
        topicScores[key] = { earned: 0, total: 0, label: TOPIC_LABELS[c.topic] };
      }
      topicScores[key].earned += caseSelfScore(c);
      topicScores[key].total += c.marks;
    });
    const sortedTopics = Object.values(topicScores).sort(
      (a, b) => a.earned / a.total - b.earned / b.total,
    );

    // gather suggested files from low-scoring cases
    const suggestedFiles = new Set<string>();
    cases.forEach((c) => {
      if (caseSelfScore(c) < c.marks * 0.7) {
        c.referenceFiles.forEach((f) => suggestedFiles.add(f));
      }
    });

    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2 text-slate-800">Case Practice Complete</h2>
            <p className="text-slate-500 mb-6">Self-scored results — be honest, then review the gaps.</p>

            <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 mb-6 text-center">
              <div className="text-sm uppercase tracking-wide text-violet-600 font-semibold mb-1">
                Total self-score
              </div>
              <div className="text-4xl font-bold text-violet-700">
                {earnedMarks} / {totalMarks}
              </div>
              <div className="text-violet-600 mt-1">{pct}%</div>
            </div>

            <h3 className="font-semibold text-slate-700 mb-3">By case</h3>
            <div className="space-y-2 mb-6">
              {cases.map((c, i) => {
                const score = caseSelfScore(c);
                const passed = score >= c.marks * 0.7;
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-slate-800 text-sm">
                        Case {i + 1} · {TOPIC_LABELS[c.topic]}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {c.prompt.slice(0, 90)}…
                      </div>
                    </div>
                    <div
                      className={`font-bold text-sm ml-3 whitespace-nowrap ${
                        passed ? 'text-green-600' : 'text-amber-600'
                      }`}
                    >
                      {score} / {c.marks}
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

            {suggestedFiles.size > 0 && (
              <>
                <h3 className="font-semibold text-slate-700 mb-3">Review suggestions</h3>
                <div className="space-y-1 mb-6 text-sm">
                  {Array.from(suggestedFiles).map((f) => (
                    <div key={f} className="text-violet-700 font-mono text-xs">
                      → docs/palliative/{f}
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

  // ============================================================
  // CASE PRACTICE — IN-PROGRESS
  // ============================================================
  if (mode === 'case') {
    const c = cases[cIndex];
    const isRevealed = !!revealed[c.id];
    const promptIsCollapsed = !!promptCollapsed[c.id];
    const caseChecks = rubricChecks[c.id] ?? {};
    const currentScore = caseSelfScore(c);

    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <h1 className="font-bold text-slate-700">
              Case {cIndex + 1} of {cases.length}
            </h1>
            <button onClick={resetAll} className="text-sm text-red-500 hover:underline">
              Exit Practice
            </button>
          </div>

          {/* Case prompt */}
          <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-violet-600 text-xs uppercase tracking-wide font-semibold">
                {TOPIC_LABELS[c.topic]} · {c.marks} marks
              </p>
              {isRevealed && (
                <button
                  onClick={() =>
                    setPromptCollapsed({ ...promptCollapsed, [c.id]: !promptIsCollapsed })
                  }
                  className="text-xs text-slate-500 hover:text-violet-600"
                >
                  {promptIsCollapsed ? '▾ Show prompt' : '▴ Collapse prompt'}
                </button>
              )}
            </div>

            {!promptIsCollapsed && (
              <>
                <p className="text-base text-slate-800 leading-relaxed mb-4">{c.prompt}</p>
                {c.frameworks && c.frameworks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs text-slate-500">Frameworks:</span>
                    {c.frameworks.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded border border-violet-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Textarea before reveal */}
            {!isRevealed && (
              <>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Write or outline your answer (optional)
                </label>
                <textarea
                  value={drafts[c.id] ?? ''}
                  onChange={(e) => setDrafts({ ...drafts, [c.id]: e.target.value })}
                  placeholder="Think it through or write a structured answer here..."
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none min-h-[200px] text-sm text-slate-800"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={revealCurrent}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                  >
                    Reveal Model Answer
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Rubric after reveal */}
          {isRevealed && (
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs uppercase tracking-wide text-violet-600 font-semibold">
                    Self-score
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {currentScore} / {c.marks}
                  </div>
                </div>
                <div className="text-xs text-slate-500 text-right">
                  Tick each point you covered<br />
                  in your answer.
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {c.rubric.map((r: RubricPoint, idx) => {
                  const ticked = !!caseChecks[r.id];
                  const detailKey = `${c.id}::${r.id}`;
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
                          onChange={() => toggleRubricPoint(c.id, r.id)}
                          className="w-5 h-5 mt-0.5 accent-violet-600 cursor-pointer flex-shrink-0"
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
                            onClick={() => toggleExpanded(detailKey)}
                            className="text-xs text-violet-600 hover:text-violet-800 mt-1"
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

              {c.referenceFiles.length > 0 && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
                    Related topic files
                  </div>
                  <div className="space-y-1">
                    {c.referenceFiles.map((f) => (
                      <div key={f} className="text-sm text-violet-700 font-mono text-xs">
                        → docs/palliative/{f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={goNextCase}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                >
                  {cIndex === cases.length - 1 ? 'Finish Practice' : 'Next Case'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // QUICK PRACTICE — IN-PROGRESS
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
          <h1 className="font-bold text-slate-700">
            Question {qIndex + 1} of {questions.length}
          </h1>
          <button onClick={resetAll} className="text-sm text-red-500 hover:underline">
            Exit Quiz
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          <div className="mb-6">
            <p className="text-violet-600 text-xs mb-3 uppercase tracking-wide font-semibold">
              {TOPIC_LABELS[currentQ.topic]} · {currentQ.type === 'mcq' ? 'Multiple Choice' : 'True / False'}
            </p>
            <p className="text-lg text-slate-800 leading-relaxed">{currentQ.prompt}</p>
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
                } else if (isSelected) cls += ' border-violet-500 bg-violet-50';
                else cls += ' border-slate-200 hover:border-violet-300 hover:bg-slate-50';
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
              [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ].map((opt) => {
                const isSelected = selection === opt.value;
                const isAnswer = currentQ.type === 'tf' && opt.value === currentQ.correctAnswer;
                let cls = 'w-full text-left p-3 border rounded-lg transition-colors flex items-center gap-3';
                if (hasChecked) {
                  if (isAnswer) cls += ' border-green-500 bg-green-50';
                  else if (isSelected) cls += ' border-red-500 bg-red-50';
                  else cls += ' border-slate-200 bg-white';
                } else if (isSelected) cls += ' border-violet-500 bg-violet-50';
                else cls += ' border-slate-200 hover:border-violet-300 hover:bg-slate-50';
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
            <div
              className={`mb-6 p-4 rounded-lg border ${
                correct ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <p className={`font-bold mb-2 ${correct ? 'text-green-700' : 'text-red-700'}`}>
                {correct ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Rationale: </span>
                {currentQ.rationale}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!hasChecked ? (
              <button
                onClick={checkCurrentQuick}
                disabled={selection === undefined}
                className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
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
