import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Practice Test Generator</h1>
          <p className="text-slate-500">Choose a course to begin a practice session.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/math"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-slate-100 transition-all"
          >
            <div className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-2">Course</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700">
              Chemistry & Math Practice
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Scientific arithmetic, algebra, dimensional analysis, significant figures, stoichiometry,
              gas laws, and density.
            </p>
            <span className="inline-flex items-center text-blue-600 font-medium text-sm">
              Start practicing →
            </span>
          </Link>

          <Link
            href="/nutrition"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-slate-100 transition-all"
          >
            <div className="text-sm uppercase tracking-wide text-emerald-600 font-semibold mb-2">Course</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700">
              Nutrition & Dietetics Practice
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Nursing-style MCQ and True/False questions on malnutrition, SAM management, NCDs,
              lifecycle nutrition, and interventions in Ghana.
            </p>
            <span className="inline-flex items-center text-emerald-600 font-medium text-sm">
              Start practicing →
            </span>
          </Link>

          <Link
            href="/palliative"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-slate-100 transition-all"
          >
            <div className="text-sm uppercase tracking-wide text-violet-600 font-semibold mb-2">Course</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-violet-700">
              Palliative Care Practice
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Nursing-style MCQ and True/False questions on total pain, the WHO analgesic ladder,
              care of the dying patient, breaking bad news, and Worden&apos;s tasks of mourning.
            </p>
            <span className="inline-flex items-center text-violet-600 font-medium text-sm">
              Start practicing →
            </span>
          </Link>

          <Link
            href="/research"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-slate-100 transition-all"
          >
            <div className="text-sm uppercase tracking-wide text-indigo-600 font-semibold mb-2">Course</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700">
              Research Methods Practice
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              MCQ/TF on study designs, sampling, validity, ethics, and data saturation;
              Yamane &amp; Cochran sample-size drills; and subjective drills on objectives,
              research questions, themes, and independent/dependent variables.
            </p>
            <span className="inline-flex items-center text-indigo-600 font-medium text-sm">
              Start practicing →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
