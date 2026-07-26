'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import CourseTabs from '@/components/CourseTabs';
import {
  NutritionQuestion,
  NutritionTopic,
  TOPIC_LABELS,
  getQuestionsByTopics,
} from '@/lib/nutritionQuestions';
import ReviewList, { ReviewItem } from '@/components/ReviewList';
import { pickSpacedQuestions, recordAttempt } from '@/lib/practiceStats';
import { saveCourseProgress } from '@/lib/progressTracker';

type SelectedTopics = Record<NutritionTopic, boolean>;

const DEFAULT_TOPICS: SelectedTopics = {
  intro: true,
  factors: true,
  lifecycle: true,
  malnutrition: true,
  undernutrition: true,
  sam: true,
  ncd: true,
  ghana: true,
};

interface ShuffledMCQ {
  id: string;
  displayChoices: string[];
  correctDisplayIndex: number;
}

function shuffleMCQ(q: NutritionQuestion): ShuffledMCQ | null {
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

export default function NutritionPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [topics, setTopics] = useState<SelectedTopics>(DEFAULT_TOPICS);
  const [count, setCount] = useState(15);
  const [questions, setQuestions] = useState<NutritionQuestion[]>([]);
  const [shuffles, setShuffles] = useState<Record<string, ShuffledMCQ>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, number | boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const selectedTopicList = useMemo(
    () => (Object.keys(topics) as NutritionTopic[]).filter((t) => topics[t]),
    [topics],
  );

  const startQuiz = () => {
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
    const chosen = pickSpacedQuestions('nutrition', pool, count);
    const sh: Record<string, ShuffledMCQ> = {};
    chosen.forEach((q) => {
      if (q.type === 'mcq') {
        const s = shuffleMCQ(q);
        if (s) sh[q.id] = s;
      }
    });
    setQuestions(chosen);
    setShuffles(sh);
    setCurrentIndex(0);
    setSelections({});
    setChecked({});
    setStarted(true);
    setFinished(false);
  };

  const resetQuiz = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setShuffles({});
    setCurrentIndex(0);
    setSelections({});
    setChecked({});
  };

  const checkCurrent = () => {
    const q = questions[currentIndex];
    if (q.id in selections) {
      setChecked({ ...checked, [q.id]: true });
      recordAttempt('nutrition', { questionId: q.id, topicKey: q.topic, correct: isCorrect(q) });
    }
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const correct = questions.filter((q) => checked[q.id] && isCorrect(q)).length;
      saveCourseProgress('nutrition', { type: 'quick', correct, total: questions.length });
      setFinished(true);
    }
  };

  const isCorrect = (q: NutritionQuestion): boolean => {
    const selection = selections[q.id];
    if (selection === undefined) return false;
    if (q.type === 'tf') return selection === q.correctAnswer;
    const sh = shuffles[q.id];
    return sh ? selection === sh.correctDisplayIndex : false;
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <CourseTabs courseId="nutrition" active="practice" />

          <p className="text-sm text-slate-500 mb-4">Choose the topics you want to be tested on.</p>

          <div className="space-y-3 mb-6">
            {(Object.keys(TOPIC_LABELS) as NutritionTopic[]).map((t) => (
              <label key={t} className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-slate-700">{TOPIC_LABELS[t]}</span>
                <input
                  type="checkbox"
                  checked={topics[t]}
                  onChange={(e) => setTopics({ ...topics, [t]: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600"
                />
              </label>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 mb-6">
            <label className="block font-medium text-slate-700 mb-2">Number of Questions</label>
            <input
              type="number"
              min={1}
              max={220}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(220, parseInt(e.target.value) || 1)))}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <p className="text-xs text-slate-400 mt-1">Up to 220 unique questions available.</p>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const correctCount = questions.filter((q) => checked[q.id] && isCorrect(q)).length;
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
        correct: !!checked[q.id] && isCorrect(q),
      };
    });
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
            <div className="text-xl mb-6">
              Score: <span className="font-bold text-emerald-600">{correctCount}</span> / {questions.length}
            </div>
          </div>
          <div className="mb-6">
            <ReviewList items={reviewItems} accent="text-emerald-600" />
          </div>
          <div className="flex flex-col gap-3 text-center">
            <button
              onClick={resetQuiz}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Start New Quiz
            </button>
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-800 text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasChecked = !!checked[currentQ.id];
  const correct = hasChecked && isCorrect(currentQ);
  const selection = selections[currentQ.id];
  const sh = currentQ.type === 'mcq' ? shuffles[currentQ.id] : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
          <h1 className="font-bold text-slate-700">
            Question {currentIndex + 1} of {questions.length}
          </h1>
          <button onClick={resetQuiz} className="text-sm text-red-500 hover:underline">
            Exit Quiz
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          <div className="mb-6">
            <p className="text-emerald-600 text-xs mb-3 uppercase tracking-wide font-semibold">
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
                let cls =
                  'w-full text-left p-3 border rounded-lg transition-colors flex items-start gap-3';
                if (hasChecked) {
                  if (isAnswer) {
                    cls += ' border-green-500 bg-green-50';
                  } else if (isSelected) {
                    cls += ' border-red-500 bg-red-50';
                  } else {
                    cls += ' border-slate-200 bg-white';
                  }
                } else if (isSelected) {
                  cls += ' border-emerald-500 bg-emerald-50';
                } else {
                  cls += ' border-slate-200 hover:border-emerald-300 hover:bg-slate-50';
                }
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
                const isAnswer =
                  currentQ.type === 'tf' && opt.value === currentQ.correctAnswer;
                let cls =
                  'w-full text-left p-3 border rounded-lg transition-colors flex items-center gap-3';
                if (hasChecked) {
                  if (isAnswer) {
                    cls += ' border-green-500 bg-green-50';
                  } else if (isSelected) {
                    cls += ' border-red-500 bg-red-50';
                  } else {
                    cls += ' border-slate-200 bg-white';
                  }
                } else if (isSelected) {
                  cls += ' border-emerald-500 bg-emerald-50';
                } else {
                  cls += ' border-slate-200 hover:border-emerald-300 hover:bg-slate-50';
                }
                return (
                  <button
                    key={opt.label}
                    disabled={hasChecked}
                    onClick={() =>
                      setSelections({ ...selections, [currentQ.id]: opt.value })
                    }
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
                correct
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <p
                className={`font-bold mb-2 ${
                  correct ? 'text-green-700' : 'text-red-700'
                }`}
              >
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
                onClick={checkCurrent}
                disabled={selection === undefined}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={goNext}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
              >
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
