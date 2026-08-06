// Central course metadata — the single source of truth for the course list,
// their routes, display labels, and accent colors. Used by the dashboard,
// the courses grid, per-course stats, and the practice/stats tab bar.

export interface CourseMeta {
  id: string; // also the practice route slug: /<id>
  title: string;
  shortTitle: string;
  blurb: string;
  accent: string; // hex, for charts and dots
  textColor: string; // tailwind text color used on the marketing cards
  hoverText: string;
}

export const COURSES: CourseMeta[] = [
  {
    id: 'math',
    title: 'Chemistry & Math Practice',
    shortTitle: 'Chemistry & Math',
    blurb:
      'Scientific arithmetic, algebra, dimensional analysis, significant figures, stoichiometry, gas laws, and density.',
    accent: '#2563EB',
    textColor: 'text-blue-600',
    hoverText: 'text-blue-700',
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Dietetics Practice',
    shortTitle: 'Nutrition',
    blurb:
      'Nursing-style MCQ and True/False questions on malnutrition, SAM management, NCDs, and lifecycle nutrition.',
    accent: '#059669',
    textColor: 'text-emerald-600',
    hoverText: 'text-emerald-700',
  },
  {
    id: 'palliative',
    title: 'Palliative Care Practice',
    shortTitle: 'Palliative Care',
    blurb:
      'MCQ and True/False on total pain, the WHO analgesic ladder, care of the dying, breaking bad news, and grief.',
    accent: '#7C3AED',
    textColor: 'text-violet-600',
    hoverText: 'text-violet-700',
  },
  {
    id: 'research',
    title: 'Research Methods Practice',
    shortTitle: 'Research Methods',
    blurb:
      'MCQ/TF on study designs, sampling, validity, ethics, and data saturation; sample-size and subjective drills.',
    accent: '#4F46E5',
    textColor: 'text-indigo-600',
    hoverText: 'text-indigo-700',
  },
  {
    id: 'pharmacology',
    title: 'Pharmacology Practice',
    shortTitle: 'Pharmacology',
    blurb:
      'MCQ/TF on pharmacokinetics/dynamics, ANS, cardiovascular, respiratory, renal, and NSAID/opioid pharmacology.',
    accent: '#E11D48',
    textColor: 'text-rose-600',
    hoverText: 'text-rose-700',
  },
  {
    id: 'surgery',
    title: 'Surgery & Surgical Nursing II',
    shortTitle: 'Surgery II',
    blurb:
      'MCQ/TF on GI, hepatobiliary, urology, breast/gynae, cardiothoracic, and paediatric surgery, plus clinical drills.',
    accent: '#D97706',
    textColor: 'text-amber-600',
    hoverText: 'text-amber-700',
  },
  {
    id: 'calculus',
    title: 'Calculus Practice',
    shortTitle: 'Calculus',
    blurb:
      'Differentiation and partial differentiation with unlimited generated problems plus curated worked solutions.',
    accent: '#0D9488',
    textColor: 'text-teal-600',
    hoverText: 'text-teal-700',
  },
  {
    id: 'materials',
    title: 'Engineering Materials Practice',
    shortTitle: 'Eng. Materials',
    blurb:
      'MCQ/TF on material classes, crystal structure, defects, mechanical testing, iron-carbon, and corrosion.',
    accent: '#0891B2',
    textColor: 'text-cyan-600',
    hoverText: 'text-cyan-700',
  },
  {
    id: 'applied-electricity',
    title: 'Applied Electricity Practice',
    shortTitle: 'Applied Elec.',
    blurb:
      'DC circuits, network theorems, capacitors, inductors, AC analysis, power, and three-phase - generated numeric problems plus curated MCQ/TF and drills.',
    accent: '#EA580C',
    textColor: 'text-orange-600',
    hoverText: 'text-orange-700',
  },
];

export const COURSE_BY_ID: Record<string, CourseMeta> = Object.fromEntries(
  COURSES.map((c) => [c.id, c]),
);

export function getCourse(id: string): CourseMeta | undefined {
  return COURSE_BY_ID[id];
}
