'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStreak } from '@/lib/progressTracker';

export default function AppNav({ active }: { active: 'dashboard' | 'courses' }) {
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    setStreak(getStreak().current);
  }, []);

  const tab = (key: 'dashboard' | 'courses', label: string, href: string) => (
    <Link
      href={href}
      aria-current={key === active ? 'page' : undefined}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        key === active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white grid place-items-center font-extrabold">
          P
        </span>
        <span className="font-bold text-slate-800">Practice</span>
      </Link>

      <nav className="flex gap-1 bg-white border border-slate-100 rounded-xl p-1 shadow-sm" aria-label="Primary">
        {tab('dashboard', 'Dashboard', '/')}
        {tab('courses', 'Courses', '/courses')}
      </nav>

      <div className="min-w-[90px] flex justify-end">
        {streak && streak > 0 ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold bg-orange-50 text-orange-700 border border-orange-100 px-3 py-1.5 rounded-full">
            🔥 <span className="tabular-nums">{streak}</span>-day
          </span>
        ) : null}
      </div>
    </div>
  );
}
