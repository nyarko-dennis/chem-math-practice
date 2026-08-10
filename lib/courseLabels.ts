// Central map of course id -> topic/type key -> human-readable label.
// Used by analytics surfaces (e.g. the home dashboard "focus areas") to name
// the weak topics tracked in practiceStats.

import { TOPIC_LABELS as NUTRITION_LABELS } from './nutritionQuestions';
import { TOPIC_LABELS as PALLIATIVE_LABELS } from './palliativeQuestions';
import { TOPIC_LABELS as RESEARCH_LABELS } from './researchQuestions';
import { PHARM_TOPIC_LABELS } from './pharmacologyQuestions';
import { SURGERY_TOPIC_LABELS } from './surgeryQuestions';
import { MATERIALS_TOPIC_LABELS } from './materialsTypes';
import { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes';
import { LEADERSHIP_TOPIC_LABELS } from './leadershipTypes';

// Generated-content courses have no bank label map; label their type/category keys here.
const MATH_LABELS: Record<string, string> = {
  arithmetic: 'Scientific Arithmetic',
  algebra: 'Algebra Rearrangement',
  'Dimensional Analysis': 'Dimensional Analysis',
  sigfigs: 'Significant Figures',
  stoichiometry: 'Stoichiometry',
  gasLaws: 'Gas Laws',
  density: 'Density & Matter',
};

const CALCULUS_LABELS: Record<string, string> = {
  basicRules: 'Basic Rules & Standard Derivatives',
  implicitHigherOrder: 'Implicit & Higher-Order',
  partial: 'Partial Differentiation',
  applications: 'Applications of Differentiation',
};

export const COURSE_TOPIC_LABELS: Record<string, Record<string, string>> = {
  math: MATH_LABELS,
  calculus: CALCULUS_LABELS,
  nutrition: NUTRITION_LABELS,
  palliative: PALLIATIVE_LABELS,
  research: RESEARCH_LABELS,
  pharmacology: PHARM_TOPIC_LABELS,
  surgery: SURGERY_TOPIC_LABELS,
  materials: MATERIALS_TOPIC_LABELS,
  'applied-electricity': APPLIED_ELECTRICITY_TOPIC_LABELS,
  'leadership-development': LEADERSHIP_TOPIC_LABELS,
};

/** Human label for a topic/type key within a course, falling back to the raw key. */
export function labelForTopic(courseId: string, key: string): string {
  return COURSE_TOPIC_LABELS[courseId]?.[key] ?? key;
}
