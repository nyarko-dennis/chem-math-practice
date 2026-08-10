import { developmentQuestions } from './ldBankDevelopment.ts';
import { runBankInvariants } from './ldBankInvariants.ts';

runBankInvariants(developmentQuestions, 'lddev', 'development');
