import type { AppliedElectricityQuestion } from './appliedElectricityTypes.ts';
import { dcCircuitsQuestions } from './aeBankDcCircuits.ts';
import { networkTheoremsQuestions } from './aeBankNetworkTheorems.ts';
import { capacitorsQuestions } from './aeBankCapacitors.ts';
import { inductorsQuestions } from './aeBankInductors.ts';
import { acFundamentalsQuestions } from './aeBankAcFundamentals.ts';
import { acAnalysisQuestions } from './aeBankAcAnalysis.ts';
import { powerQuestions } from './aeBankPower.ts';
import { threePhaseQuestions } from './aeBankThreePhase.ts';

export type { AppliedElectricityTopic, AppliedElectricityQuestion, MCQuestion, TFQuestion } from './appliedElectricityTypes.ts';
export { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes.ts';

export const appliedElectricityQuestions: AppliedElectricityQuestion[] = [
  ...dcCircuitsQuestions,
  ...networkTheoremsQuestions,
  ...capacitorsQuestions,
  ...inductorsQuestions,
  ...acFundamentalsQuestions,
  ...acAnalysisQuestions,
  ...powerQuestions,
  ...threePhaseQuestions,
];
