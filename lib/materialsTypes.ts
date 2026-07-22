export type MaterialsTopic =
  | 'introClassification'
  | 'atomicCrystal'
  | 'solidificationDefects'
  | 'mechanicalTesting'
  | 'ironCarbonHeat'
  | 'steelProduction'
  | 'ferrousSteels'
  | 'corrosionAdvanced';

export const MATERIALS_TOPIC_LABELS: Record<MaterialsTopic, string> = {
  introClassification: 'Intro & Classification (material classes, materials science vs engineering, history)',
  atomicCrystal: 'Atomic Structure & Crystal Structures (bonding, BCC/FCC/HCP, crystalline vs amorphous)',
  solidificationDefects: 'Solidification, Solid Solutions & Imperfections (nucleation, solid solutions, diffusion, defects)',
  mechanicalTesting: 'Mechanical Properties & Testing (stress/strain, ductility, toughness, fatigue, creep, hardness tests)',
  ironCarbonHeat: 'Iron-Carbon Diagram & Heat Treatment (phases, eutectoid, annealing/quenching/tempering)',
  steelProduction: 'Iron & Steel Production (pig iron, blast furnace, BOF/EAF)',
  ferrousSteels: 'Ferrous Metals & Steel Classification (carbon steels, AISI/SAE, alloying, stainless/tool steels, cast irons)',
  corrosionAdvanced: 'Corrosion, Composites & Smart Materials',
};

export interface MCQuestion {
  id: string;
  topic: MaterialsTopic;
  type: 'mcq';
  prompt: string;
  choices: string[];
  correctIndex: number;
  rationale: string;
}

export interface TFQuestion {
  id: string;
  topic: MaterialsTopic;
  type: 'tf';
  prompt: string;
  correctAnswer: boolean;
  rationale: string;
}

export type MaterialsQuestion = MCQuestion | TFQuestion;

export type MaterialsDrillKind =
  | 'defineTerms'
  | 'classify'
  | 'explainProcess'
  | 'compare'
  | 'selectMaterial';

export const MATERIALS_DRILL_LABELS: Record<MaterialsDrillKind, string> = {
  defineTerms: 'Define key materials terms',
  classify: 'Classify materials / steels / defects',
  explainProcess: 'Explain a process step by step',
  compare: 'Compare / contrast two things',
  selectMaterial: 'Select a material for an application & justify',
};

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export interface MaterialsDrill {
  id: string;
  topic: MaterialsTopic;
  drillKind: MaterialsDrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;
}
