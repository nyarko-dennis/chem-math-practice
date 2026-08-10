import type { LeadershipQuestion } from './leadershipTypes.ts';
import { conceptsQuestions } from './ldBankConcepts.ts';
import { theoriesQuestions } from './ldBankTheories.ts';
import { stylesQuestions } from './ldBankStyles.ts';
import { communicationQuestions } from './ldBankCommunication.ts';
import { decisionMakingQuestions } from './ldBankDecisionMaking.ts';
import { teamBuildingQuestions } from './ldBankTeamBuilding.ts';
import { emotionalIntelligenceQuestions } from './ldBankEmotionalIntelligence.ts';
import { developmentQuestions } from './ldBankDevelopment.ts';

export type {
  LeadershipTopic,
  LeadershipQuestion,
  MCQuestion,
  TFQuestion,
} from './leadershipTypes.ts';
export { LEADERSHIP_TOPIC_LABELS } from './leadershipTypes.ts';

export const leadershipQuestions: LeadershipQuestion[] = [
  ...conceptsQuestions,
  ...theoriesQuestions,
  ...stylesQuestions,
  ...communicationQuestions,
  ...decisionMakingQuestions,
  ...teamBuildingQuestions,
  ...emotionalIntelligenceQuestions,
  ...developmentQuestions,
];
