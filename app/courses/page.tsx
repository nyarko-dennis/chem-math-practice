'use client';

import AppNav from '@/components/AppNav';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/courses';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-5xl mx-auto py-6">
        <AppNav active="courses" />

        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Courses</h1>
          <p className="text-slate-500 text-sm">
            Pick a course to practice. Open a course and switch to its Stats tab for detailed progress.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
