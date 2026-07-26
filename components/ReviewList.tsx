'use client';

import { useState } from 'react';
import MathDisplay from './MathDisplay';

export interface ReviewItem {
  id: string;
  topicLabel?: string;
  prompt: string;
  promptIsLatex?: boolean;
  yourAnswer: string;
  correctAnswer: string;
  answerIsLatex?: boolean;
  explanation?: string;
  explanationIsLatex?: boolean;
  correct: boolean;
}

function Content({ text, latex }: { text: string; latex?: boolean }) {
  if (!text) return <span className="text-slate-400">—</span>;
  return latex ? <MathDisplay latex={text} /> : <span>{text}</span>;
}

/**
 * Post-quiz review. Shows missed questions by default (the high-value ones to
 * revisit) with a toggle to reveal everything.
 */
export default function ReviewList({
  items,
  accent = 'text-blue-600',
}: {
  items: ReviewItem[];
  accent?: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const missed = items.filter((i) => !i.correct);
  const shown = showAll ? items : missed;

  if (items.length === 0) return null;

  return (
    <div className="text-left">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-800">
          {missed.length === 0 ? 'Review' : `Review — ${missed.length} to revisit`}
        </h3>
        {missed.length > 0 && missed.length < items.length && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className={`text-sm font-medium ${accent} hover:underline`}
          >
            {showAll ? 'Show only missed' : 'Show all'}
          </button>
        )}
      </div>

      {missed.length === 0 && !showAll ? (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
          Perfect run — nothing missed. Nice work!
          <button
            onClick={() => setShowAll(true)}
            className={`ml-2 font-medium ${accent} hover:underline`}
          >
            Review all anyway
          </button>
        </div>
      ) : (
        <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {shown.map((item, idx) => (
            <li
              key={item.id}
              className={`p-4 rounded-lg border ${
                item.correct
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : 'border-rose-200 bg-rose-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                {item.topicLabel && (
                  <span className="text-[11px] uppercase tracking-wide font-semibold text-slate-500">
                    {item.topicLabel}
                  </span>
                )}
                <span
                  className={`text-xs font-bold ${
                    item.correct ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {item.correct ? 'Correct' : 'Missed'}
                </span>
              </div>
              <div className="text-sm text-slate-800 mb-2">
                <span className="text-slate-400 mr-1">{idx + 1}.</span>
                <Content text={item.prompt} latex={item.promptIsLatex} />
              </div>
              {!item.correct && (
                <div className="text-sm mb-1">
                  <span className="font-semibold text-slate-500">Your answer: </span>
                  <span className="text-rose-700">
                    <Content text={item.yourAnswer} latex={item.answerIsLatex} />
                  </span>
                </div>
              )}
              <div className="text-sm mb-1">
                <span className="font-semibold text-slate-500">Correct answer: </span>
                <span className="text-emerald-700">
                  <Content text={item.correctAnswer} latex={item.answerIsLatex} />
                </span>
              </div>
              {item.explanation && (
                <div className="text-sm text-slate-600 mt-2 pt-2 border-t border-slate-200/70">
                  <Content text={item.explanation} latex={item.explanationIsLatex} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
