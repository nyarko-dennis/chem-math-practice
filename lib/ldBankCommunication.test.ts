import { communicationQuestions } from './ldBankCommunication.ts';
import { runBankInvariants } from './ldBankInvariants.ts';

runBankInvariants(communicationQuestions, 'ldcom', 'communication');
