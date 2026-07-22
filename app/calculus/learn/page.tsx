'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculusLessons, CalculusLesson, WorkedExample } from '@/lib/calculusLessons';
import { CalculusQuestion } from '@/lib/calculusQuestions';
import { normalizeCalculusLatex } from '@/lib/calculusAnswer';
import { checkAnswer } from '@/lib/checkAnswer';
import MathDisplay from '@/components/MathDisplay';
import MathInput from '@/components/MathInput';

function ExampleCard({ example }: { example: WorkedExample }) {
  const [revealed, setRevealed] = useState(0);
  const done = revealed >= example.steps.length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-4">
      <h3 className="font-bold text-slate-800 mb-2">{example.title}</h3>
      <div className="text-xl text-center py-4 bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto mb-4">
        <MathDisplay latex={example.prompt} block />
      </div>

      {example.steps.slice(0, revealed).map((s, i) => (
        <div key={i} className="mb-3 pl-4 border-l-2 border-teal-200">
          <p className="text-sm text-slate-600 mb-1">
            <span className="font-semibold text-teal-700">Step {i + 1}.</span> {s.explanation}
          </p>
          <div className="overflow-x-auto">
            <MathDisplay latex={s.latex} block />
          </div>
        </div>
      ))}

      {!done ? (
        <button
          onClick={() => setRevealed(revealed + 1)}
          className="mt-2 bg-teal-50 border border-teal-200 text-teal-700 font-semibold py-2 px-4 rounded-lg hover:bg-teal-100 transition-colors text-sm"
        >
          {revealed === 0 ? 'Show first step' : 'Show next step'}
        </button>
      ) : (
        <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-medium flex items-center gap-2">
          <span>Final answer:</span>
          <MathDisplay latex={example.answer} />
        </div>
      )}
    </div>
  );
}

function TryIt({ lesson }: { lesson: CalculusLesson }) {
  const [question, setQuestion] = useState<CalculusQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const draw = () => {
    setQuestion(lesson.tryIt());
    setAnswer('');
    setResult(null);
    setShowSolution(false);
  };

  const check = () => {
    if (!question) return;
    const ok = checkAnswer(
      'algebra',
      normalizeCalculusLatex(question.correctAnswer),
      normalizeCalculusLatex(answer),
    );
    setResult(ok);
    setShowSolution(!ok);
  };

  if (!question) {
    return (
      <button
        onClick={draw}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Try one yourself →
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-200">
      <p className="text-sm uppercase tracking-wide font-semibold text-teal-700 mb-2">Your turn</p>
      <p className="text-slate-800 mb-3">{question.instructions}</p>
      <div className="text-xl text-center py-4 bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto mb-4">
        <MathDisplay latex={question.prompt} block />
      </div>
      <MathInput key={question.id} value={answer} onChange={setAnswer} disabled={result === true} />
      {result !== null && (
        <div className={`mt-2 font-medium ${result ? 'text-green-600' : 'text-red-600'}`}>
          {result ? 'Correct!' : 'Not quite - see the worked solution below, then try another.'}
        </div>
      )}
      {showSolution && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-slate-700">
          <p className="mb-2 text-sm">
            Correct answer: <span className="font-mono font-bold">{question.correctAnswer}</span>
          </p>
          <div className="overflow-x-auto">
            <MathDisplay latex={question.solution} />
          </div>
        </div>
      )}
      <div className="flex justify-end gap-3 mt-4">
        {result !== true && (
          <button
            onClick={check}
            disabled={!answer}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            Check Answer
          </button>
        )}
        <button
          onClick={draw}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Try another
        </button>
      </div>
    </div>
  );
}

export default function CalculusLearnPage() {
  const [lessonId, setLessonId] = useState<string | null>(null);
  const lesson = calculusLessons.find((l) => l.id === lessonId) ?? null;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Learn Calculus</h1>
            <Link href="/calculus" className="text-sm text-slate-500 hover:text-slate-800">← Back to practice</Link>
          </div>
          <p className="text-slate-600 mb-6">
            Pick a topic. Each lesson walks through worked examples one step at a time, then lets you try a question yourself.
          </p>
          <div className="grid gap-3">
            {calculusLessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setLessonId(l.id)}
                className="text-left bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-teal-300 hover:shadow-md transition-all"
              >
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Lesson {i + 1}</span>
                <h2 className="font-bold text-slate-800">{l.title}</h2>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-800">{lesson.title}</h1>
          <button onClick={() => setLessonId(null)} className="text-sm text-slate-500 hover:text-slate-800">
            ← All lessons
          </button>
        </div>
        <p className="text-slate-600 mb-6">{lesson.intro}</p>
        {lesson.examples.map((ex) => (
          <ExampleCard key={ex.id} example={ex} />
        ))}
        <div className="mt-6">
          <TryIt key={lesson.id} lesson={lesson} />
        </div>
      </div>
    </div>
  );
}
