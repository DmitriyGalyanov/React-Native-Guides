//@ts-nocheck

//these are for gameState Context example -- start
import {colors} from './constants';

export type OutcomeKeyName =
	'firstTeamWin' | 'tie' | 'secondTeamWin' | null;
export type OutcomeDisplayName =
	'Победа' | 'Ничья' | 'Поражение' | null;

export type MatchTileButtonColor = colors.green | colors.gray | colors.red;

export type Outcome = {
	keyName: OutcomeKeyName,
	displayName: OutcomeDisplayName,
	accentColor: MatchTileButtonColor,
};

export type Match = {
	matchId: number;
	firstTeamName: string;
	secondTeamName: string;
};
// -- end


// single match creation for apps with coefficients dropdowns -- start

export type CoefGroupKeyName =
	| 'winner' | 'total'
	| 'firstTeamTotal' | 'secondTeamTotal'
	| 'ifOvertime' | string;
export type CoefGroupDisplayName =
	| 'Кто победит' | 'Тотал'
	| 'Тотал команды 1' | 'Тотал команды 2'
	| 'Будет ли овертайм';
export type CoefficientKeyName =
	| 'firstTeamWin' | 'secondTeamWin'
	| 'moreThan0_5' | 'lessThan0_5'
	| 'moreThan1_5' | 'lessThan1_5'
	| 'overtimeTrue' | 'overtimeFalse';
export type CoefficientDisplayName =
	| 'Команда 1' | 'Команда 2'
	| 'Больше 0.5' | 'Меньше 0.5'
	| 'Больше 1.5' | 'Меньше 1.5'
	| 'Да' | 'Нет';
export type Coefficient = {
	keyName: CoefficientKeyName,
	displayName: CoefficientDisplayName,
	value: number,
	isTrue: boolean,
};
export type CoefficientsGroup = {
	displayName: CoefGroupDisplayName,
	keyName: CoefGroupKeyName,
	firstTeamWin?: Coefficient,
	secondTeamWin?: Coefficient,
	moreThan0_5?: Coefficient,
	lessThan0_5?: Coefficient,
	moreThan1_5?: Coefficient,
	lessThan1_5?: Coefficient,
	overtimeTrue?: Coefficient,
	overtimeFalse?: Coefficient,
};
export type CoefficientsData = {
	[key in CoefGroupKeyName]: CoefficientsGroup;
};
export type MatchData = {
	firstTeamName: string,
	secondTeamName: string,
	coefficients: CoefficientsData,
	scoreString: string,
};


// single match creation for apps with coefficients dropdowns -- end