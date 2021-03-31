//@ts-nocheck
import { Match, OutcomeKeyName } from '../../commonTypes';

import { createMatches } from '../../helpers';
import React, { Dispatch } from 'react';

export type GameState = {
	matchesData: Array<Match>,
	modalVisible: boolean,
	selectedMatchId: number,
	selectedOutcomeKeyName: OutcomeKeyName,
	winningOutcomeKeyName: OutcomeKeyName,
};
export const initialGameState: GameState = {
	matchesData: [],
	modalVisible: false,
	selectedMatchId: -1,
	selectedOutcomeKeyName: null,
	winningOutcomeKeyName: null,
};

export type GameAction =
	| { type: 'createMatchesDataAction' }
	| { type: 'setModalVisible', payload: boolean }
	| { type: 'setSelectedMatchId', payload: number }
	| { type: 'setSelectedOutcomeKeyName', payload: OutcomeKeyName }
	| { type: 'setWinningOutcomeKeyName', payload: OutcomeKeyName }
	| { type: 'removeMatchById', payload: number }
	| { type: 'resetState' };

export function gameReducer(state: GameState, action: GameAction)
	: GameState {
	switch (action.type) {
		case 'createMatchesDataAction':
			return {...state, matchesData: createMatches()};
		case 'setModalVisible':
			return {...state, modalVisible: action.payload};
		case 'setSelectedMatchId':
			return {...state, selectedMatchId: action.payload};
		case 'setSelectedOutcomeKeyName':
			return {...state, selectedOutcomeKeyName: action.payload};
		case 'setWinningOutcomeKeyName':
			return {...state, winningOutcomeKeyName: action.payload};
		case 'removeMatchById':
			//????
			const selectedMatchIndex = state.
			matchesData.findIndex((match: Match) => {
				return match.matchId === action.payload;
			});
			const matchesDataDraft = state.matchesData;
			matchesDataDraft.splice(selectedMatchIndex, 1);
			return {...state, matchesData: matchesDataDraft};
		case 'resetState': //works doubtfully (sometimes doesn't fully reset)
			return initialGameState;
		default:
			return state;
	}
};

export const GameStateContext =
	React.createContext<GameState>(initialGameState);
export const GameStateDispatch =
	React.createContext<Dispatch<GameAction> | null>(null);
