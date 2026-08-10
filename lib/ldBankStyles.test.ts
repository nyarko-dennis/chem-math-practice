import { stylesQuestions } from './ldBankStyles.ts';
import { runBankInvariants } from './ldBankInvariants.ts';

runBankInvariants(stylesQuestions, 'ldsty', 'styles');
