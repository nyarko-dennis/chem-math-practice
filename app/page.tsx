'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  getCourseProgress,
  hasActiveSession,
  CourseProgress,
} from '@/lib/progressTracker';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Record<string, CourseProgress | null>>({});
  const [activeSessions, setActiveSessions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
    const courses = ['math', 'nutrition', 'palliative', 'research', 'pharmacology'];
    const loadedStats: Record<string, CourseProgress | null> = {};
    const loadedActive: Record<string, boolean> = {};

    courses.forEach((c) => {
      loadedStats[c] = getCourseProgress(c);
      loadedActive[c] = hasActiveSession(c);
    });

    setStats(loadedStats);
    setActiveSessions(loadedActive);
  }, []);

  if (!mounted) {
    // Render static skeleton during SSR to avoid hydration flash
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Practice Test Generator</h1>
            <p className="text-slate-500">Choose a course to begin a practice session.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {['math', 'nutrition', 'palliative', 'research', 'pharmacology'].map((c) => (
              <div key={c} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm min-h-[180px]">
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-3 animate-pulse"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderCard = (
    id: string,
    title: string,
    description: string,
    textColor: string,
    hoverText: string
  ) => {
    const progress = stats[id];
    const isActive = activeSessions[id];

    return (
      <Link
        href={`/${id}`}
        className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-slate-100 transition-all flex flex-col justify-between"
      >
        <div>
          <div className={`text-sm uppercase tracking-wide ${textColor} font-semibold mb-2 flex items-center justify-between`}>
            <span>Course</span>
            {isActive && (
              <span className="bg-rose-50 text-rose-700 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                In Progress
              </span>
            )}
          </div>
          <h2 className={`text-xl font-bold text-slate-800 mb-2 group-hover:${hoverText}`}>
            {title}
          </h2>
          <p className="text-sm text-slate-600 mb-4">{description}</p>
        </div>

        <div>
          {progress && (() => {
            const accuracy = progress.totalQuestionsAnswered > 0
              ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100)
              : 0;
            let accuracyColor = 'bg-rose-500';
            if (accuracy >= 80) accuracyColor = 'bg-emerald-500';
            else if (accuracy >= 50) accuracyColor = 'bg-amber-500';

            return (
              <div className="mb-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-2.5 flex flex-col justify-center border border-slate-100/80">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Answered</span>
                  <span className="text-slate-800 font-bold text-base mt-0.5">{progress.totalQuestionsAnswered}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 flex flex-col justify-center border border-slate-100/80">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Avg. Accuracy</span>
                  <span className="text-slate-800 font-bold text-base mt-0.5 flex items-center gap-1.5">
                    {accuracy}%
                    <span className={`w-2 h-2 rounded-full ${accuracyColor}`}></span>
                  </span>
                </div>
              </div>
            );
          })()}

          <span className={`inline-flex items-center ${textColor} font-semibold text-sm`}>
            {isActive ? 'Resume practice session →' : 'Start practicing →'}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Practice Test Generator</h1>
          <p className="text-slate-500">Choose a course to begin a practice session.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {renderCard(
            'math',
            'Chemistry & Math Practice',
            'Scientific arithmetic, algebra, dimensional analysis, significant figures, stoichiometry, gas laws, and density.',
            'text-blue-600',
            'text-blue-700'
          )}

          {renderCard(
            'nutrition',
            'Nutrition & Dietetics Practice',
            'Nursing-style MCQ and True/False questions on malnutrition, SAM management, NCDs, lifecycle nutrition, and interventions in Ghana.',
            'text-emerald-600',
            'text-emerald-700'
          )}

          {renderCard(
            'palliative',
            'Palliative Care Practice',
            'Nursing-style MCQ and True/False questions on total pain, the WHO analgesic ladder, care of the dying patient, breaking bad news, and Worden\'s tasks of mourning.',
            'text-violet-600',
            'text-violet-700'
          )}

          {renderCard(
            'research',
            'Research Methods Practice',
            'MCQ/TF on study designs, sampling, validity, ethics, and data saturation; Yamane & Cochran sample-size drills; and subjective drills.',
            'text-indigo-600',
            'text-indigo-700'
          )}

          {renderCard(
            'pharmacology',
            'Pharmacology Practice',
            'MCQ/TF on pharmacokinetic/dynamic principles, ANS, cardiovascular, respiratory, renal, and NSAID/opioid pharmacology. Subjective drills on MoA, adverse effects, calculations, and five rights.',
            'text-rose-600',
            'text-rose-700'
          )}
        </div>
      </div>
    </div>
  );
}
