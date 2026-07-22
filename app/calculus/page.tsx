'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { assembleQuiz, CalculusQuestion } from '@/lib/calculusQuestions';
import MathDisplay from '@/components/MathDisplay';
import MathInput from '@/components/MathInput';
import { checkAnswer } from '@/lib/checkAnswer';
import { normalizeCalculusLatex } from '@/lib/calculusAnswer';
import {
  saveActiveSession,
  getActiveSession,
  clearActiveSession,
  saveCourseProgress,
} from '@/lib/progressTracker';

export default function CalculusPage() {
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<CalculusQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: boolean }>({});
  const [showSolution, setShowSolution] = useState(false);
  const [canResume, setCanResume] = useState(false);

  const [config, setConfig] = useState({
    basicRules: true,
    implicitHigherOrder: false,
    partial: false,
    applications: false,
    count: 10,
  });

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    const session = getActiveSession('calculus');
    if (session && session.questions && session.questions.length > 0) {
      setCanResume(true);
    }
  }, []);

  const resumeSession = () => {
    const session = getActiveSession('calculus');
    if (!session) return;
    setQuestions(session.questions);
    setCurrentIndex(session.currentIndex || 0);
    setAnswers(session.answers || {});
    setFeedback(session.feedback || {});
    setStarted(true);
    setCanResume(false);
  };

  const persist = (q: CalculusQuestion[], idx: number, ans: Record<string, string>, fb: Record<string, boolean>) => {
    saveActiveSession('calculus', { questions: q, currentIndex: idx, answers: ans, feedback: fb });
  };

  const startQuiz = () => {
    const newQuestions = assembleQuiz(config);
    if (newQuestions.length === 0) {
      alert('Please select at least one topic.');
      return;
    }
    setQuestions(newQuestions);
    setStarted(true);
    setFinished(false);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback({});
    setShowSolution(false);
    setCanResume(false);
    persist(newQuestions, 0, {}, {});
  };

  const verifyAnswer = () => {
    const q = questions[currentIndex];
    const answer = answers[q.id] || '';
    const isCorrect = checkAnswer('algebra', normalizeCalculusLatex(q.correctAnswer), normalizeCalculusLatex(answer));
    const newFeedback = { ...feedback, [q.id]: isCorrect };
    setFeedback(newFeedback);
    setShowSolution(!isCorrect);
    persist(questions, currentIndex, answers, newFeedback);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setShowSolution(false);
      persist(questions, nextIdx, answers, feedback);
    } else {
      const correctCount = Object.values(feedback).filter(Boolean).length;
      saveCourseProgress('calculus', { type: 'math', correct: correctCount, total: questions.length });
      clearActiveSession('calculus');
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    clearActiveSession('calculus');
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback({});
    setCanResume(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Calculus Practice</h1>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Home</Link>
          </div>

          {canResume && (
            <button
              onClick={resumeSession}
              className="w-full mb-4 bg-teal-50 border border-teal-200 text-teal-700 font-semibold py-3 px-6 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Resume in-progress session →
            </button>
          )}

          <Link
            href="/calculus/learn"
            className="block w-full mb-4 text-center bg-white border border-teal-300 text-teal-700 font-semibold py-3 px-6 rounded-lg hover:bg-teal-50 transition-colors"
          >
            📖 Learn the topics - worked examples, step by step
          </Link>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Basic rules &amp; standard derivatives</label>
              <input type="checkbox" checked={config.basicRules}
                onChange={(e) => setConfig({ ...config, basicRules: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Implicit &amp; higher-order differentiation</label>
              <input type="checkbox" checked={config.implicitHigherOrder}
                onChange={(e) => setConfig({ ...config, implicitHigherOrder: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Partial differentiation</label>
              <input type="checkbox" checked={config.partial}
                onChange={(e) => setConfig({ ...config, partial: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Applications of differentiation</label>
              <input type="checkbox" checked={config.applications}
                onChange={(e) => setConfig({ ...config, applications: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block font-medium text-slate-700 mb-2">Number of Questions</label>
              <input type="number" min={1} max={50} value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) || 10 })}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none" />
            </div>
          </div>

          <button onClick={startQuiz}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const correctCount = Object.values(feedback).filter(Boolean).length;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
          <div className="text-xl mb-6">
            Score: <span className="font-bold text-teal-600">{correctCount}</span> / {questions.length}
          </div>
          <button onClick={resetQuiz}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasAnswered = feedback[currentQ.id] !== undefined;

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
          <h1 className="font-bold text-slate-700">Question {currentIndex + 1} of {questions.length}</h1>
          <button onClick={resetQuiz} className="text-sm text-red-500 hover:underline">Exit Quiz</button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          <div className="mb-6">
            <p className="text-slate-500 text-sm mb-2 uppercase tracking-wide font-semibold">{currentQ.category}</p>
            <p className="text-lg mb-4 text-slate-800">{currentQ.instructions}</p>
            <div className="text-2xl text-center py-8 font-serif bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto">
              <MathDisplay latex={currentQ.prompt} block />
            </div>
          </div>

          <div className="mb-6">
            <MathInput
              key={currentQ.id}
              value={answers[currentQ.id] || ''}
              onChange={(val) => setAnswers({ ...answers, [currentQ.id]: val })}
              disabled={hasAnswered}
            />
            {hasAnswered && (
              <div className={`mt-2 font-medium ${feedback[currentQ.id] ? 'text-green-600' : 'text-red-600'}`}>
                {feedback[currentQ.id] ? 'Correct!' : 'Incorrect'}
              </div>
            )}
          </div>

          {showSolution && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-slate-700">
              <h3 className="font-bold mb-2">Solution:</h3>
              <p className="mb-2">Correct Answer: <span className="font-mono font-bold">{currentQ.correctAnswer}</span></p>
              <div className="mt-4 pt-4 border-t border-yellow-200">
                <MathDisplay latex={currentQ.solution} />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!hasAnswered ? (
              <button onClick={verifyAnswer} disabled={!answers[currentQ.id]}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95">
                Check Answer
              </button>
            ) : (
              <button onClick={nextQuestion}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95">
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
