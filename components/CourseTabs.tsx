import Link from 'next/link';
import { getCourse } from '@/lib/courses';

/**
 * Course header with a Practice / Stats tab switch. Practice is the default
 * course destination; Stats is a peer view of the same course.
 */
export default function CourseTabs({
  courseId,
  active,
}: {
  courseId: string;
  active: 'practice' | 'stats';
}) {
  const course = getCourse(courseId);
  const accent = course?.accent ?? '#475569';

  const tab = (key: 'practice' | 'stats', label: string, href: string) => {
    const isActive = key === active;
    return (
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
          isActive ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
      <div className="flex items-center gap-2.5 min-w-0">
        <Link href="/courses" className="text-sm text-slate-400 hover:text-slate-700 flex-none">
          ← Courses
        </Link>
        {course && (
          <>
            <span className="text-slate-300">/</span>
            <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: accent }} />
            <span className="text-sm font-semibold text-slate-700 truncate">{course.shortTitle}</span>
          </>
        )}
      </div>
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        {tab('practice', 'Practice', `/${courseId}`)}
        {tab('stats', 'Stats', `/${courseId}/stats`)}
      </div>
    </div>
  );
}
