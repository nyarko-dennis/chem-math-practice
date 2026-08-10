import { decisionMakingQuestions } from './ldBankDecisionMaking.ts';
import { runBankInvariants } from './ldBankInvariants.ts';

runBankInvariants(decisionMakingQuestions, 'lddec', 'decisionMaking');
