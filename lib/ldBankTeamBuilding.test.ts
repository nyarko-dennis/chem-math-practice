import { teamBuildingQuestions } from './ldBankTeamBuilding.ts';
import { runBankInvariants } from './ldBankInvariants.ts';

runBankInvariants(teamBuildingQuestions, 'ldtem', 'teamBuilding');
