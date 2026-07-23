import type { MaterialsQuestion } from './materialsTypes.ts';
import { introClassificationQuestions } from './materialsBankIntro.ts';
import { atomicCrystalQuestions } from './materialsBankAtomic.ts';
import { solidificationDefectsQuestions } from './materialsBankSolidification.ts';
import { mechanicalTestingQuestions } from './materialsBankMechanical.ts';
import { ironCarbonHeatQuestions } from './materialsBankIronCarbon.ts';
import { steelProductionQuestions } from './materialsBankSteelProduction.ts';
import { ferrousSteelsQuestions } from './materialsBankFerrous.ts';
import { corrosionAdvancedQuestions } from './materialsBankCorrosion.ts';

export type { MaterialsTopic, MaterialsQuestion, MCQuestion, TFQuestion } from './materialsTypes.ts';
export { MATERIALS_TOPIC_LABELS } from './materialsTypes.ts';

export const materialsQuestions: MaterialsQuestion[] = [
  ...introClassificationQuestions,
  ...atomicCrystalQuestions,
  ...solidificationDefectsQuestions,
  ...mechanicalTestingQuestions,
  ...ironCarbonHeatQuestions,
  ...steelProductionQuestions,
  ...ferrousSteelsQuestions,
  ...corrosionAdvancedQuestions,
];
