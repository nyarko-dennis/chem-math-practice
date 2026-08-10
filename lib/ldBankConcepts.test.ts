import { conceptsQuestions } from './ldBankConcepts.ts';
import { runBankInvariants } from './ldBankInvariants.ts';

runBankInvariants(conceptsQuestions, 'ldcon', 'concepts');
