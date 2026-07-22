export type CalculusCategory = 'basicRules' | 'implicitHigherOrder' | 'partial' | 'applications';

export interface CalculusQuestion {
  id: string;
  category: CalculusCategory;
  source: 'generated' | 'static';
  instructions: string;
  prompt: string;        // LaTeX
  correctAnswer: string; // LaTeX, canonical no-space form
  solution: string;      // LaTeX
}

export type CalculusQuestionCore = Omit<CalculusQuestion, 'id'>;
