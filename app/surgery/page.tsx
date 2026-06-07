'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  saveActiveSession,
  clearActiveSession,
  saveCourseProgress,
  getActiveSession,
} from '@/lib/progressTracker';
import {
  SurgeryQuestion,
  SurgeryTopic,
  SURGERY_TOPIC_LABELS,
  getQuestionsByTopics,
  getQuestionCountByTopic,
} from '@/lib/surgeryQuestions';
import {
  SurgeryDrill,
  SurgeryDrillKind,
  SURGERY_DRILL_LABELS,
  RubricPoint,
  getDrillsByKinds,
  getDrillCountByKind,
} from '@/lib/surgeryDrills';

type Mode = 'quick' | 'drill';

type SelectedTopics = Record<SurgeryTopic, boolean>;
type SelectedKinds = Record<SurgeryDrillKind, boolean>;

const DEFAULT_TOPICS: SelectedTopics = {
  esophagogastric: true,
  hepatobiliaryPancreas: true,
  bowel: true,
  pediatricBariatric: true,
  cardiothoracic: true,
  thoracicEmergency: true,
  urologyAndrology: true,
  breastGynae: true,
  pastPaper: true,
};

const DEFAULT_KINDS: SelectedKinds = {
  defineTerms: true,
  clinicalFeatures: true,
  investigations: true,
  medicalSurgicalMgmt: true,
  preopNursing: true,
  postopNursing: true,
  emergencyMgmt: true,
  patientEducation: true,
  compareConditions: true,
};

const MAX_QUICK_QUESTIONS = 250;

interface ShuffledMCQ {
  id: string;
  displayChoices: string[];
  correctDisplayIndex: number;
}

function shuffleMCQ(q: SurgeryQuestion): ShuffledMCQ | null {
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

export default function SurgeryPage() {
  const [mode, setMode] = useState<Mode>('quick');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [hasSavedSession, setHasSavedSession] = useState(false);
  const [savedSessionMode, setSavedSessionMode] = useState<'quick' | 'drill' | null>(null);

  useEffect(() => {
    const session = getActiveSession('surgery');
    if (session) {
      setHasSavedSession(true);
      setSavedSessionMode(session.mode);
    }
  }, []);

  const loadSavedSession = () => {
    const session = getActiveSession('surgery');
    if (session) {
      setMode(session.mode);
      setStarted(session.started);
      setFinished(session.finished);
      setTopics(session.topics);
      setQuickCount(session.quickCount);
      setQuestions(session.questions);
      setShuffles(session.shuffles);
      setQIndex(session.qIndex);
      setSelections(session.selections);
      setChecked(session.checked);
      setDrills(session.drills);
      setDIndex(session.dIndex);
      setDrafts(session.drafts);
      setRevealed(session.revealed);
      setRubricChecks(session.rubricChecks);
    }
  };

  const discardSavedSession = () => {
    if (confirm('Are you sure you want to discard your saved session progress?')) {
      clearActiveSession('surgery');
      setHasSavedSession(false);
      setSavedSessionMode(null);
    }
  };

  // quick mode state
  const [topics, setTopics] = useState<SelectedTopics>(DEFAULT_TOPICS);
  const [quickCount, setQuickCount] = useState(20);
  const [questions, setQuestions] = useState<SurgeryQuestion[]>([]);
  const [shuffles, setShuffles] = useState<Record<string, ShuffledMCQ>>({});
  const [qIndex, setQIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, number | boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // drill mode state
  const [kinds, setKinds] = useState<SelectedKinds>(DEFAULT_KINDS);
  const [drillCount, setDrillCount] = useState(5);
  const [drills, setDrills] = useState<SurgeryDrill[]>([]);
  const [dIndex, setDIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [rubricChecks, setRubricChecks] = useState<Record<string, Record<string, boolean>>>({});
  const [promptCollapsed, setPromptCollapsed] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const selectedTopicList = useMemo(
    () => (Object.keys(topics) as SurgeryTopic[]).filter((t) => topics[t]),
    [topics],
  );

  const selectedKindList = useMemo(
    () => (Object.keys(kinds) as SurgeryDrillKind[]).filter((k) => kinds[k]),
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

  const startQuick = () => {
    if (selectedTopicList.length === 0) {
      alert('Please select at least one topic.');
      return;
    }
    const chosen = getQuestionsByTopics(selectedTopicList, quickCount);
    if (chosen.length === 0) {
      alert('No questions available for the selected topics.');
      return;
    }
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
    }
  };

  const goNextQuick = () => {
    if (qIndex < questions.length - 1) setQIndex(qIndex + 1);
    else setFinished(true);
  };

  const isQuickCorrect = (q: SurgeryQuestion): boolean => {
    const sel = selections[q.id];
    if (sel === undefined) return false;
    if (q.type === 'tf') return sel === q.correctAnswer;
    const sh = shuffles[q.id];
    return sh ? sel === sh.correctDisplayIndex : false;
  };

  const revealDrill = () => {
    const d = drills[dIndex];
    setRevealed({ ...revealed, [d.id]: true });
    setPromptCollapsed({ ...promptCollapsed, [d.id]: true });
  };

  const toggleRubric = (drillId: string, pointId: string) => {
    const cur = rubricChecks[drillId] ?? {};
    setRubricChecks({
      ...rubricChecks,
      [drillId]: { ...cur, [pointId]: !cur[pointId] },
    });
  };

  const goNextDrill = () => {
    if (dIndex < drills.length - 1) setDIndex(dIndex + 1);
    else setFinished(true);
  };

  const drillSelfScore = (d: SurgeryDrill): number => {
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
    setDrills([]);
    setDIndex(0);
    setDrafts({});
    setRevealed({});
    setRubricChecks({});
    setPromptCollapsed({});
    setExpanded({});
    clearActiveSession('surgery');
    setHasSavedSession(false);
    setSavedSessionMode(null);
  };

  useEffect(() => {
    if (finished && started) {
      if (mode === 'quick' && questions.length > 0) {
        const correctCount = questions.filter((q) => checked[q.id] && isQuickCorrect(q)).length;
        saveCourseProgress('surgery', {
          type: 'quick',
          correct: correctCount,
          total: questions.length,
        });
      } else if (mode === 'drill' && drills.length > 0) {
        const totalMarks = drills.reduce((acc, d) => acc + d.marks, 0);
        const earnedMarks = drills.reduce((acc, d) => acc + drillSelfScore(d), 0);
        saveCourseProgress('surgery', {
          type: 'drill',
          correct: earnedMarks,
          total: totalMarks,
        });
      }
      clearActiveSession('surgery');
      setHasSavedSession(false);
      setSavedSessionMode(null);
    }
  }, [finished, started]);

  useEffect(() => {
    if (started && !finished) {
      const activeState = {
        mode,
        started,
        finished,
        topics,
        quickCount,
        questions,
        shuffles,
        qIndex,
        selections,
        checked,
        drills,
        dIndex,
        drafts,
        revealed,
        rubricChecks,
      };
      saveActiveSession('surgery', activeState);
    }
  }, [
    started,
    finished,
    mode,
    topics,
    quickCount,
    questions,
    shuffles,
    qIndex,
    selections,
    checked,
    drills,
    dIndex,
    drafts,
    revealed,
    rubricChecks,
  ]);

  // SETUP SCREEN
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Surgery & Surgical Nursing II</h1>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Home</Link>
          </div>

          {hasSavedSession && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
              <div>
                <h3 className="font-semibold text-amber-800 text-sm">Session in Progress</h3>
                <p className="text-xs text-amber-700">You have a saved {savedSessionMode === 'quick' ? 'Quick Practice' : 'Subjective Drill'} session.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={loadSavedSession}
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
              onClick={() => setMode('quick')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'quick'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Quick Practice
            </button>
            <button
              onClick={() => setMode('drill')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'drill'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Subjective Drills
            </button>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            {mode === 'quick'
              ? 'MCQ and True/False questions across all Surgery II topics. Plain-language explanations.'
              : 'Subjective response drills with detailed model answers, plain-language rationale, and self-scored rubrics.'}
          </p>

          {mode === 'quick' && (
            <>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                {(Object.keys(SURGERY_TOPIC_LABELS) as SurgeryTopic[]).map((t) => (
                  <label key={t} className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-slate-700 text-sm">
                      {SURGERY_TOPIC_LABELS[t]}
                      <span className="text-xs text-slate-400 ml-2">({quickCountsByTopic[t] ?? 0})</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={topics[t]}
                      onChange={(e) => setTopics({ ...topics, [t]: e.target.checked })}
                      className="w-5 h-5 accent-amber-600"
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
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {totalQuickAvailable} questions available across selected topics.
                </p>
              </div>

              <button
                onClick={startQuick}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Quiz
              </button>
            </>
          )}

          {mode === 'drill' && (
            <>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                {(Object.keys(SURGERY_DRILL_LABELS) as SurgeryDrillKind[]).map((k) => (
                  <label key={k} className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-slate-700 text-sm">
                      {SURGERY_DRILL_LABELS[k]}
                      <span className="text-xs text-slate-400 ml-2">({drillCountsByKind[k] ?? 0})</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={kinds[k]}
                      onChange={(e) => setKinds({ ...kinds, [k]: e.target.checked })}
                      className="w-5 h-5 accent-amber-600"
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
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {totalDrillsAvailable} drills available across selected types.
                </p>
              </div>

              <button
                onClick={startDrill}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Subjective Drills
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // FINISHED SCREEN
  if (finished) {
    if (mode === 'quick') {
      const correctCount = questions.filter((q) => checked[q.id] && isQuickCorrect(q)).length;
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
            <div className="text-xl mb-6">
              Score: <span className="font-bold text-amber-600">{correctCount}</span> / {questions.length}
            </div>
            <div className="flex flex-col gap-3">
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

    const totalMarks = drills.reduce((acc, d) => acc + d.marks, 0);
    const earnedMarks = drills.reduce((acc, d) => acc + drillSelfScore(d), 0);
    const pct = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;

    const topicScores: Record<string, { earned: number; total: number; label: string }> = {};
    drills.forEach((d) => {
      const key = d.topic;
      if (!topicScores[key]) {
        topicScores[key] = { earned: 0, total: 0, label: SURGERY_TOPIC_LABELS[d.topic] };
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
            <h2 className="text-3xl font-bold mb-2 text-slate-800">Subjective Drills Complete</h2>
            <p className="text-slate-500 mb-6">Self-scored results — review the gaps honestly.</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6 text-center">
              <div className="text-sm uppercase tracking-wide text-amber-600 font-semibold mb-1">
                Total self-score
              </div>
              <div className="text-4xl font-bold text-amber-700">
                {earnedMarks} / {totalMarks}
              </div>
              <div className="text-amber-600 mt-1">{pct}%</div>
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
                        Drill {i + 1} · {SURGERY_DRILL_LABELS[d.drillKind]}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {d.prompt.slice(0, 90).replace(/\n/g, ' ')}…
                      </div>
                    </div>
                    <div
                      className={`font-bold text-sm ml-3 whitespace-nowrap ${
                        passed ? 'text-green-600' : 'text-amber-600'
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

  // DRILL PRACTICE — IN-PROGRESS
  if (mode === 'drill') {
    const d = drills[dIndex];
    const isRevealed = !!revealed[d.id];
    const promptIsCollapsed = !!promptCollapsed[d.id];
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
              Exit Practice
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-amber-600 text-xs uppercase tracking-wide font-semibold">
                {SURGERY_DRILL_LABELS[d.drillKind]} · {d.marks} marks
              </p>
              {isRevealed && (
                <button
                  onClick={() =>
                    setPromptCollapsed({ ...promptCollapsed, [d.id]: !promptIsCollapsed })
                  }
                  className="text-xs text-slate-500 hover:text-amber-600"
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
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Write or outline your answer (optional)
                </label>
                <textarea
                  value={drafts[d.id] ?? ''}
                  onChange={(e) => setDrafts({ ...drafts, [d.id]: e.target.value })}
                  placeholder="Outline your answer or write key details down..."
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[200px] text-sm text-slate-800"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={revealDrill}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                  >
                    Reveal Model Answer
                  </button>
                </div>
              </>
            )}
          </div>

          {isRevealed && (
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-xs uppercase tracking-wide text-amber-600 font-semibold mb-2">
                  Model answer
                </div>
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed">
                  {d.modelAnswer}
                </pre>
              </div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs uppercase tracking-wide text-amber-600 font-semibold">
                    Self-score
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {currentScore} / {d.marks}
                  </div>
                </div>
                <div className="text-xs text-slate-500 text-right">
                  Tick each point you covered<br />
                  in your answer.
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {d.rubric.map((r: RubricPoint, idx) => {
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
                          className="w-5 h-5 mt-0.5 accent-amber-600 cursor-pointer flex-shrink-0"
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
                            className="text-xs text-amber-600 hover:text-amber-800 mt-1"
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

              {d.referenceSections && d.referenceSections.length > 0 && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
                    Reference (docs/surgery/surgery.md)
                  </div>
                  <div className="space-y-1">
                    {d.referenceSections.map((s) => (
                      <div key={s} className="text-sm text-amber-700 font-mono text-xs">
                        → {s}
                      </div>
                    ))}
                  </div>
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

  // QUICK PRACTICE (MCQ/TF) — IN-PROGRESS
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
            <p className="text-amber-600 text-xs mb-3 uppercase tracking-wide font-semibold">
              {SURGERY_TOPIC_LABELS[currentQ.topic]} · {currentQ.type === 'mcq' ? 'Multiple Choice' : 'True / False'}
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
                } else if (isSelected) cls += ' border-amber-500 bg-amber-50';
                else cls += ' border-slate-200 hover:border-amber-300 hover:bg-slate-50';
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
                } else if (isSelected) cls += ' border-amber-500 bg-amber-50';
                else cls += ' border-slate-200 hover:border-amber-300 hover:bg-slate-50';
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
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
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
