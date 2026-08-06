import CourseTabs from '@/components/CourseTabs';
import CourseStats from '@/components/CourseStats';

export default function AppliedElectricityStatsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-5xl mx-auto py-6">
        <CourseTabs courseId="applied-electricity" active="stats" />
        <CourseStats courseId="applied-electricity" />
      </div>
    </div>
  );
}
