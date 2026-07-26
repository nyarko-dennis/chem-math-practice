import CourseTabs from '@/components/CourseTabs';
import CourseStats from '@/components/CourseStats';

export default function CalculusStatsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-5xl mx-auto py-6">
        <CourseTabs courseId="calculus" active="stats" />
        <CourseStats courseId="calculus" />
      </div>
    </div>
  );
}
