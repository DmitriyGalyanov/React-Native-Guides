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