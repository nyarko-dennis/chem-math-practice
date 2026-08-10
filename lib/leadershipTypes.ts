export type LeadershipTopic =
  | 'concepts'
  | 'theories'
  | 'styles'
  | 'communication'
  | 'decisionMaking'
  | 'teamBuilding'
  | 'emotionalIntelligence'
  | 'development';

export const LEADERSHIP_TOPIC_LABELS: Record<LeadershipTopic, string> = {
  concepts: 'Leadership Concepts (what leadership is, leadership vs management, roles, power & influence)',
  theories: 'Leadership Theories (trait/Great Man, behavioural, contingency/situational, transformational vs transactional, servant)',
  styles: 'Leadership Styles (autocratic/democratic/laissez-faire, task vs relationship, African vs Western models)',
  communication: 'Communication (the communication process, listening, barriers, feedback, channels)',
  decisionMaking: 'Decision Making (rational model, bounded rationality, group decisions, biases, participation)',
  teamBuilding: 'Team Building (stages of team development, roles, cohesion, conflict, delegation)',
  emotionalIntelligence: 'Emotional Intelligence (self-awareness, self-regulation, motivation, empathy, social skills)',
  development: 'Leadership Development (mentoring, coaching, training, self-development, succession, growth)',
};

export interface MCQuestion {
  id: string;
  topic: LeadershipTopic;
  type: 'mcq';
  prompt: string;
  choices: string[];
  correctIndex: number;
  rationale: string;
}

export interface TFQuestion {
  id: string;
  topic: LeadershipTopic;
  type: 'tf';
  prompt: string;
  correctAnswer: boolean;
  rationale: string;
}

export type LeadershipQuestion = MCQuestion | TFQuestion;

export type LeadershipDrillKind =
  | 'defineTerms'
  | 'explainConcept'
  | 'compare'
  | 'applyScenario'
  | 'reflect';

export const LEADERSHIP_DRILL_LABELS: Record<LeadershipDrillKind, string> = {
  defineTerms: 'Define key leadership terms',
  explainConcept: 'Explain a concept, theory, or model',
  compare: 'Compare / contrast two ideas',
  applyScenario: 'Apply a concept to a workplace scenario',
  reflect: 'Reflect on your own leadership practice',
};

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export interface LeadershipDrill {
  id: string;
  topic: LeadershipTopic;
  drillKind: LeadershipDrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;
}
