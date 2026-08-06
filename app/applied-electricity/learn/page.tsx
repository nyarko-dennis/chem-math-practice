'use client';

import { useState } from 'react';
import Link from 'next/link';
import { aeLessons, AeLesson, WorkedExample } from '@/lib/aeLessons';
import { AeGeneratedQuestion } from '@/lib/aeGenerators';
import { checkAeAnswer } from '@/lib/aeAnswer';
import MathDisplay from '@/components/MathDisplay';

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
        <div key={i} className="mb-3 pl-4 border-l-2 border-sky-200">
          <p className="text-sm text-slate-600 mb-1">
            <span className="font-semibold text-sky-700">Step {i + 1}.</span> {s.explanation}
          </p>
          <div className="overflow-x-auto">
            <MathDisplay latex={s.latex} block />
          </div>
        </div>
      ))}

      {!done ? (
        <button
          onClick={() => setRevealed(revealed + 1)}
          className="mt-2 bg-sky-50 border border-sky-200 text-sky-700 font-semibold py-2 px-4 rounded-lg hover:bg-sky-100 transition-colors text-sm"
        >
          {revealed === 0 ? 'Show first step' : 'Show next step'}
        </button>
      ) : (
        <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-medium flex flex-wrap items-center gap-2">
          <span>Final answer:</span>
          <MathDisplay latex={example.answer} />
        </div>
      )}
    </div>
  );
}

function TryIt({ lesson }: { lesson: AeLesson }) {
  const [question, setQuestion] = useState<AeGeneratedQuestion | null>(null);
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
    const ok = checkAeAnswer(answer, question.answer);
    setResult(ok);
    setShowSolution(!ok);
  };

  if (!question) {
    return (
      <button
        onClick={draw}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Try one yourself →
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-sky-200">
      <p className="text-sm uppercase tracking-wide font-semibold text-sky-700 mb-2">Your turn</p>
      <p className="text-slate-800 mb-3">{question.instructions}</p>
      <div className="text-xl text-center py-4 bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto mb-4">
        <MathDisplay latex={question.prompt} block />
      </div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={result === true}
        placeholder="Enter your answer (e.g. 4.5 A, 12 Ω, 3+j4 Ω)"
        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:bg-slate-100"
      />
      {result !== null && (
        <div className={`mt-2 font-medium ${result ? 'text-green-600' : 'text-red-600'}`}>
          {result ? 'Correct!' : 'Not quite - see the worked solution below, then try another.'}
        </div>
      )}
      {showSolution && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-slate-700">
          <p className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-sm">Correct answer:</span>
            <MathDisplay latex={question.answerDisplay} />
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
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
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

export default function AppliedElectricityLearnPage() {
  const [lessonId, setLessonId] = useState<string | null>(null);
  const lesson = aeLessons.find((l) => l.id === lessonId) ?? null;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Learn Applied Electricity</h1>
            <Link href="/applied-electricity" className="text-sm text-slate-500 hover:text-slate-800">
              ← Back to practice
            </Link>
          </div>
          <p className="text-slate-600 mb-6">
            Pick a topic. Each lesson walks through worked examples one step at a time, then lets you try a question yourself.
          </p>
          <div className="grid gap-3">
            {aeLessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setLessonId(l.id)}
                className="text-left bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-sky-300 hover:shadow-md transition-all"
              >
                <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">Lesson {i + 1}</span>
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
