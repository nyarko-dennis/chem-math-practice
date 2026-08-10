import { emotionalIntelligenceQuestions } from './ldBankEmotionalIntelligence.ts';
import { runBankInvariants } from './ldBankInvariants.ts';

runBankInvariants(emotionalIntelligenceQuestions, 'ldemo', 'emotionalIntelligence');
