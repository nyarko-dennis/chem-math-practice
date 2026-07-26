'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppNav from '@/components/AppNav';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/courses';
import { getCourseProgress, getStreak } from '@/lib/progressTracker';
import { countDueQuestions, getMasteryBreakdown, getTopicMastery } from '@/lib/practiceStats';
import { labelForTopic } from '@/lib/courseLabels';
import AccountMenu from '@/components/AccountMenu';

interface FocusItem {
  courseId: string;
  courseTitle: string;
  accent: string;
  topic: string;
  accuracy: number;
}

interface DashData {
  totalDue: number;
  topDue: { id: string; title: string; due: number } | null;
  focus: FocusItem[];
  mastery: { learning: number; reviewing: number; mastered: number; total: number };
  answered: number;
  correct: number;
  sessions: number;
  streak: number;
  longest: number;
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

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [d, setD] = useState<DashData | null>(null);

  useEffect(() => {
    setMounted(true);
    const focus: FocusItem[] = [];
    const mastery = { learning: 0, reviewing: 0, mastered: 0, total: 0 };
    let totalDue = 0;
    let answered = 0;
    let correct = 0;
    let sessions = 0;
    let topDue: DashData['topDue'] = null;

    for (const c of COURSES) {
      const due = countDueQuestions(c.id);
      totalDue += due;
      if (due > 0 && (!topDue || due > topDue.due)) {
        topDue = { id: c.id, title: c.shortTitle, due };
      }

      const mb = getMasteryBreakdown(c.id);
      mastery.learning += mb.learning;
      mastery.reviewing += mb.reviewing;
      mastery.mastered += mb.mastered;
      mastery.total += mb.total;

      const p = getCourseProgress(c.id);
      if (p) {
        answered += p.totalQuestionsAnswered;
        correct += p.totalCorrectAnswers;
        sessions += p.completedSessionsCount;
      }

      for (const t of getTopicMastery(c.id)) {
        if (t.seen >= 2 && t.accuracy < 0.85) {
          focus.push({
            courseId: c.id,
            courseTitle: c.shortTitle,
            accent: c.accent,
            topic: labelForTopic(c.id, t.key),
            accuracy: Math.round(t.accuracy * 100),
          });
        }
      }
    }
    focus.sort((a, b) => a.accuracy - b.accuracy);
    const s = getStreak();
    setD({ totalDue, topDue, focus: focus.slice(0, 6), mastery, answered, correct, sessions, streak: s.current, longest: s.longest });
  }, []);

  if (!mounted || !d) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans">
        <div className="max-w-5xl mx-auto py-6">
          <div className="h-10 bg-slate-100 rounded-lg w-full mb-6 animate-pulse" />
          <div className="h-28 bg-slate-100 rounded-xl w-full mb-5 animate-pulse" />
          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const avgAccuracy = d.answered > 0 ? Math.round((d.correct / d.answered) * 100) : null;
  const hasData = d.answered > 0 || d.mastery.total > 0;
  const mpct = (n: number) => (d.mastery.total > 0 ? (n / d.mastery.total) * 100 : 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-5xl mx-auto py-6">
        <AppNav active="dashboard" />

        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back — here&apos;s where to focus today.</p>
        </div>

        <AccountMenu />

        {/* Hero */}
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5 flex items-center justify-between gap-6 flex-wrap">
          <span className="absolute inset-y-0 left-0 w-1 bg-indigo-500" aria-hidden="true" />
          {d.totalDue > 0 ? (
            <>
              <div className="flex items-center gap-5">
                <span className="text-5xl font-extrabold text-slate-800 tabular-nums leading-none">{d.totalDue}</span>
                <div>
                  <h2 className="text-base font-bold text-slate-800">questions due for review</h2>
                  <p className="text-sm text-slate-500 max-w-sm">
                    Spaced repetition picks the ones you&apos;re about to forget, across your courses.
                  </p>
                </div>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {d.topDue && (
                  <Link
                    href={`/${d.topDue.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg text-sm"
                  >
                    Review {d.topDue.title} ({d.topDue.due}) →
                  </Link>
                )}
                <Link
                  href="/courses"
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-lg text-sm"
                >
                  All courses
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {hasData ? 'Nothing due — nice work.' : 'Start your first session'}
                </h2>
                <p className="text-sm text-slate-500 max-w-md">
                  {hasData
                    ? 'Keep your streak going with a fresh practice session.'
                    : 'Pick a course and your progress, weak spots, and review queue will build up here.'}
                </p>
              </div>
              <Link
                href="/courses"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg text-sm"
              >
                Browse courses →
              </Link>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-5 items-start">
          {/* main column */}
          <div className="lg:col-span-2 space-y-5">
            {d.focus.length > 0 && (
              <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-slate-800 text-sm">Focus areas</h3>
                <p className="text-xs text-slate-500 mb-3">
                  Your weakest topics across every course — the highest-leverage place to spend time.
                </p>
                <div>
                  {d.focus.map((f, i) => (
                    <Link
                      key={i}
                      href={`/${f.courseId}/stats`}
                      className="block py-2.5 border-t border-slate-100 first:border-t-0 group"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full flex-none" style={{ background: f.accent }} />
                          <span className="text-sm font-semibold text-slate-700 truncate group-hover:text-slate-900">
                            {f.topic}
                          </span>
                          <span className="text-[11px] text-slate-400 flex-none">{f.courseTitle}</span>
                        </span>
                        <span className={`text-sm font-bold tabular-nums ${tone(f.accuracy)}`}>{f.accuracy}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1.5">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${f.accuracy}%`, background: barColor(f.accuracy) }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Your courses</h3>
                  <p className="text-xs text-slate-500">Accuracy, mastery, and what&apos;s due.</p>
                </div>
                <Link href="/courses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  See all →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {COURSES.slice(0, 4).map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </section>
          </div>

          {/* rail */}
          <aside className="space-y-5">
            <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-3">Overall</h3>
              <dl className="space-y-0">
                <div className="flex items-baseline justify-between py-2 border-t border-slate-100 first:border-t-0">
                  <dt className="text-sm text-slate-500">Current streak</dt>
                  <dd className="text-base font-bold tabular-nums">{d.streak} days</dd>
                </div>
                <div className="flex items-baseline justify-between py-2 border-t border-slate-100">
                  <dt className="text-sm text-slate-500">Longest streak</dt>
                  <dd className="text-base font-bold tabular-nums">{d.longest} days</dd>
                </div>
                <div className="flex items-baseline justify-between py-2 border-t border-slate-100">
                  <dt className="text-sm text-slate-500">Sessions</dt>
                  <dd className="text-base font-bold tabular-nums">{d.sessions}</dd>
                </div>
                <div className="flex items-baseline justify-between py-2 border-t border-slate-100">
                  <dt className="text-sm text-slate-500">Questions answered</dt>
                  <dd className="text-base font-bold tabular-nums">{d.answered}</dd>
                </div>
                <div className="flex items-baseline justify-between py-2 border-t border-slate-100">
                  <dt className="text-sm text-slate-500">Avg. accuracy</dt>
                  <dd className={`text-base font-bold tabular-nums ${avgAccuracy !== null ? tone(avgAccuracy) : ''}`}>
                    {avgAccuracy !== null ? `${avgAccuracy}%` : '—'}
                  </dd>
                </div>
              </dl>
            </section>

            {d.mastery.total > 0 && (
              <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-slate-800 text-sm">Mastery</h3>
                <p className="text-xs text-slate-500 mb-3">Across {d.mastery.total} tracked questions.</p>
                <div className="flex gap-0.5 h-3 mb-3" aria-hidden="true">
                  <span className="rounded-sm" style={{ width: `${mpct(d.mastery.learning)}%`, background: '#E8B366' }} />
                  <span className="rounded-sm" style={{ width: `${mpct(d.mastery.reviewing)}%`, background: '#9AA2E6' }} />
                  <span className="rounded-sm" style={{ width: `${mpct(d.mastery.mastered)}%`, background: '#10B981' }} />
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#E8B366' }} />
                    <span className="text-slate-600">Learning</span>
                    <span className="ml-auto font-bold tabular-nums text-slate-700">{d.mastery.learning}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#9AA2E6' }} />
                    <span className="text-slate-600">Reviewing</span>
                    <span className="ml-auto font-bold tabular-nums text-slate-700">{d.mastery.reviewing}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#10B981' }} />
                    <span className="text-slate-600">Mastered</span>
                    <span className="ml-auto font-bold tabular-nums text-slate-700">{d.mastery.mastered}</span>
                  </li>
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
