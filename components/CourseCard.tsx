'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CourseMeta } from '@/lib/courses';
import { getCourseProgress, hasActiveSession } from '@/lib/progressTracker';
import { countDueQuestions, getMasteryBreakdown, MasteryBreakdown } from '@/lib/practiceStats';
import { Sparkline } from './charts';

interface CardData {
  accuracy: number | null;
  trend: number[];
  due: number;
  active: boolean;
  mastery: MasteryBreakdown;
}

function accuracyTone(acc: number): string {
  if (acc >= 80) return 'text-emerald-600';
  if (acc >= 50) return 'text-amber-600';
  return 'text-rose-600';
}

export default function CourseCard({ course }: { course: CourseMeta }) {
  const [data, setData] = useState<CardData | null>(null);

  useEffect(() => {
    const progress = getCourseProgress(course.id);
    const accuracy =
      progress && progress.totalQuestionsAnswered > 0
        ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100)
        : null;
    const trend = (progress?.history ?? [])
      .slice(-10)
      .map((h) => (h.total > 0 ? Math.round((h.correct / h.total) * 100) : 0));
    setData({
      accuracy,
      trend,
      due: countDueQuestions(course.id),
      active: hasActiveSession(course.id),
      mastery: getMasteryBreakdown(course.id),
    });
  }, [course.id]);

  const m = data?.mastery;
  const total = m?.total ?? 0;
  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0);

  return (
    <Link
      href={`/${course.id}`}
      className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all p-4 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: course.accent }} />
        <h3 className="text-sm font-semibold text-slate-800 truncate flex-1">{course.shortTitle}</h3>
        {data?.active ? (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">
            In progress
          </span>
        ) : data && data.due > 0 ? (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
            {data.due} due
          </span>
        ) : null}
      </div>

      {data && data.accuracy !== null ? (
        <>
          <div className="flex items-end justify-between gap-2 mb-3">
            <div className="flex flex-col">
              <span className={`text-2xl font-extrabold leading-none tabular-nums ${accuracyTone(data.accuracy)}`}>
                {data.accuracy}
                <span className="text-sm font-bold text-slate-400">%</span>
              </span>
              <span className="text-[11px] uppercase tracking-wide font-semibold text-slate-400 mt-1">
                accuracy
              </span>
            </div>
            {data.trend.length >= 2 && <Sparkline data={data.trend} color={course.accent} />}
          </div>

          {total > 0 && (
            <>
              <div className="flex gap-0.5 h-2 mb-1.5" aria-hidden="true">
                <span className="rounded-sm" style={{ width: `${pct(m!.learning)}%`, background: '#E8B366' }} />
                <span className="rounded-sm" style={{ width: `${pct(m!.reviewing)}%`, background: '#9AA2E6' }} />
                <span className="rounded-sm" style={{ width: `${pct(m!.mastered)}%`, background: '#10B981' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>
                  <span className="font-semibold text-slate-700 tabular-nums">{total}</span> tracked
                </span>
                <span>
                  <span className="font-semibold text-slate-700 tabular-nums">{m!.mastered}</span> mastered
                </span>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col justify-center py-3">
          <p className="text-sm text-slate-400">Not started yet</p>
          <span
            className={`text-sm font-semibold mt-1 ${course.textColor} group-hover:${course.hoverText}`}
          >
            Start practicing →
          </span>
        </div>
      )}
    </Link>
  );
}
