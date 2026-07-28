'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCourse } from '@/lib/courses';
import { labelForTopic } from '@/lib/courseLabels';
import { getCourseProgress, CourseProgress } from '@/lib/progressTracker';
import {
  getTopicMastery,
  getMasteryBreakdown,
  countDueQuestions,
  TopicMastery,
  MasteryBreakdown,
} from '@/lib/practiceStats';
import { AccuracyChart } from './charts';

interface StatsData {
  progress: CourseProgress | null;
  topics: TopicMastery[];
  mastery: MasteryBreakdown;
  due: number;
}

function tone(acc: number): string {
  if (acc >= 70) return 'text-emerald-600';
  if (acc >= 50) return 'text-amber-600';
  return 'text-rose-600';
}
function barColor(acc: number): string {
  if (acc >= 70) return '#10B981';
  if (acc >= 50) return '#D97706';
  return '#E11D48';
}

export default function CourseStats({ courseId }: { courseId: string }) {
  const course = getCourse(courseId);
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    setData({
      progress: getCourseProgress(courseId),
      topics: getTopicMastery(courseId).filter((t) => t.seen > 0),
      mastery: getMasteryBreakdown(courseId),
      due: countDueQuestions(courseId),
    });
  }, [courseId]);

  if (!data) {
    return <div className="h-64 rounded-xl bg-white border border-slate-100 animate-pulse" />;
  }

  const { progress, topics, mastery, due } = data;
  const answered = progress?.totalQuestionsAnswered ?? 0;
  const hasData = answered > 0 || topics.length > 0;

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-10 text-center">
        <h3 className="text-lg font-bold text-slate-800 mb-1">No stats yet</h3>
        <p className="text-slate-500 mb-5 text-sm">
          Practice this course and your accuracy, weak topics, and mastery will show up here.
        </p>
        <Link
          href={`/${courseId}`}
          className="inline-flex bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-6 rounded-lg text-sm"
        >
          Start practicing →
        </Link>
      </div>
    );
  }

  const avgAccuracy =
    answered > 0 ? Math.round(((progress?.totalCorrectAnswers ?? 0) / answered) * 100) : 0;
  const history = (progress?.history ?? []).map((h) =>
    h.total > 0 ? Math.round((h.correct / h.total) * 100) : 0,
  );
  const weakest = topics[0]; // getTopicMastery is sorted weakest-first
  const masteredPct = mastery.total > 0 ? Math.round((mastery.mastered / mastery.total) * 100) : 0;
  const pct = (n: number) => (mastery.total > 0 ? (n / mastery.total) * 100 : 0);
  const recent = [...(progress?.history ?? [])].slice(-6).reverse();

  return (
    <div className="space-y-5">
      {/* action row */}
      <div className="flex items-center justify-end gap-3">
        {due > 0 && (
          <span className="text-sm text-amber-700 font-medium">{due} due for review</span>
        )}
        <Link
          href={`/${courseId}`}
          className="inline-flex bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-5 rounded-lg text-sm"
        >
          Practice →
        </Link>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Avg. accuracy</div>
          <div className={`text-2xl font-extrabold mt-1.5 tabular-nums ${tone(avgAccuracy)}`}>
            {avgAccuracy}
            <span className="text-sm text-slate-400">%</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">{progress?.completedSessionsCount ?? 0} sessions</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Answered</div>
          <div className="text-2xl font-extrabold mt-1.5 tabular-nums text-slate-800">{answered}</div>
          <div className="text-xs text-slate-500 mt-1">questions attempted</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Mastered</div>
          <div className="text-2xl font-extrabold mt-1.5 tabular-nums text-slate-800">
            {mastery.mastered}
            <span className="text-sm text-slate-400">/{mastery.total}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">{masteredPct}% of tracked</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">Weakest topic</div>
          {weakest ? (
            <>
              <div className={`text-sm font-bold mt-1.5 leading-tight ${tone(Math.round(weakest.accuracy * 100))}`}>
                {labelForTopic(courseId, weakest.key)}
              </div>
              <div className="text-xs text-slate-500 mt-1 tabular-nums">
                {Math.round(weakest.accuracy * 100)}% accuracy
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-400 mt-1.5">—</div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5 items-start">
        {/* accuracy over time + recent sessions */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 text-sm">Accuracy over time</h3>
            <p className="text-xs text-slate-500 mb-3">Score on each recent session.</p>
            {history.length >= 2 ? (
              <>
                <AccuracyChart data={history} color={course?.accent ?? '#4F46E5'} />
                <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                  <span>{history.length} sessions ago</span>
                  <span>most recent</span>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400 py-8 text-center">
                Finish a few sessions to see your trend.
              </p>
            )}
          </div>

          {recent.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-3">Recent sessions</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10.5px] uppercase tracking-wide text-slate-400 text-left">
                    <th className="font-semibold pb-2">When</th>
                    <th className="font-semibold pb-2">Type</th>
                    <th className="font-semibold pb-2 text-right">Score</th>
                    <th className="font-semibold pb-2 text-right">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((s, i) => {
                    const acc = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                    return (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-2 text-slate-600">{s.date}</td>
                        <td className="py-2">
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                            {s.type}
                          </span>
                        </td>
                        <td className="py-2 text-right font-semibold tabular-nums text-slate-700">
                          {s.correct}/{s.total}
                        </td>
                        <td className={`py-2 text-right font-semibold tabular-nums ${tone(acc)}`}>{acc}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* topic mastery + breakdown */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 text-sm">Topic mastery</h3>
            <p className="text-xs text-slate-500 mb-3">Weakest first — where to focus in this course.</p>
            {topics.length > 0 ? (
              <div>
                {topics.map((t) => {
                  const acc = Math.round(t.accuracy * 100);
                  return (
                    <div key={t.key} className="py-2.5 border-t border-slate-100 first:border-t-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-700 truncate">
                          {labelForTopic(courseId, t.key)}
                        </span>
                        <span className={`text-sm font-bold tabular-nums ${tone(acc)}`}>{acc}%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${acc}%`, background: barColor(acc) }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 tabular-nums flex-none">{t.seen} seen</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No topic data yet.</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Mastery breakdown</h3>
            {mastery.total > 0 ? (
              <>
                <div className="flex gap-0.5 h-3 mb-3" aria-hidden="true">
                  <span className="rounded-sm" style={{ width: `${pct(mastery.learning)}%`, background: '#E8B366' }} />
                  <span className="rounded-sm" style={{ width: `${pct(mastery.reviewing)}%`, background: '#9AA2E6' }} />
                  <span className="rounded-sm" style={{ width: `${pct(mastery.mastered)}%`, background: '#10B981' }} />
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm flex-none" style={{ background: '#E8B366' }} />
                    <span className="text-slate-600">Learning</span>
                    <span className="ml-auto font-bold tabular-nums text-slate-700">{mastery.learning}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm flex-none" style={{ background: '#9AA2E6' }} />
                    <span className="text-slate-600">Reviewing</span>
                    <span className="ml-auto font-bold tabular-nums text-slate-700">{mastery.reviewing}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm flex-none" style={{ background: '#10B981' }} />
                    <span className="text-slate-600">Mastered</span>
                    <span className="ml-auto font-bold tabular-nums text-slate-700">{mastery.mastered}</span>
                  </li>
                </ul>
              </>
            ) : (
              <p className="text-sm text-slate-400">Mastery tracks curated bank questions as you review them.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
