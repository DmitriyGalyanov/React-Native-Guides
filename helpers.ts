//@ts-nocheck
/**
 * @returns random Int lesser or equal to MAX and greater or equal to MIN
 */
export const getRandomIntInclusive = (min: number, max: number): number => {
	const localMin = Math.ceil(min);
	const localMax = Math.floor(max);
	return Math.floor(Math.random() * (localMax - localMin + 1)) + localMin;
};


import React from 'react';

import { Animated } from 'react-native';

export const animateValue = (
	animatableValue: React.MutableRefObject<Animated.Value>,
	toValue: number,
	animDuration: number): void => {
	Animated.timing(animatableValue.current, {
		toValue: toValue,
		duration: animDuration,
		useNativeDriver: false,
	}).start();
};

import { Animated, Easing } from 'react-native';

export const easingAnimateValue = (
	animatableValue: React.MutableRefObject<Animated.Value>,
	toValue: number,
	animDuration: number): void => {
	Animated.timing(animatableValue.current, {
		toValue: toValue,
		duration: animDuration,
		useNativeDriver: true,
		easing: Easing.out(Easing.quad),
	}).start();
};

/**
 * @returns sequence of random NON-repeating side-by-side integers
 * */
export const getRandomSequence = (length: number, from: number, to: number):
	Array<number> => {
	let sequence: Array<number> = [];
	while (sequence.length < length) {
		const randomNumber: number = getRandomIntInclusive(from, to);
		if (sequence[sequence.length - 1] !== randomNumber) {
			sequence.push(randomNumber);
		};
	};
	return sequence;
};

/**
 * @returns sequence of random NON-repeating in whole sequence integers
 * */
export const getRandomNonRepeatSequence
= (length: number, from: number, to: number):
	Array<number> => {
	var sequence: Array<number> = [];
	while(sequence.length < length) {
		const randomNumber: number = getRandomIntInclusive(from, to);
		if(sequence.indexOf(randomNumber) === -1) sequence.push(randomNumber);
	};
	return sequence;
};

//specific helpers
// import {leaguesImagesArray} from '../assets/images';
import {
	// leagueMatchesAmount,
	matchesAmount,
	teams,
	// russiaTeams,
	// englandTeams,
	// germanyTeams,
	// italyTeams,
	// spainTeams,
	// franceTeams,
	// portugalTeams,
	betScore,
} from './constants';

import { Coefficient, Match } from './types';

/**
 * function is clunky since it was made for single discipline matches creation
 * @returns array filled with matches data (objects) needed to create a PlayField
 */
export const createMatchesComlicated = () => {
	let matchesArray: Array<Match> = [];

	let matchId: number = 1;

	// for (let i = 0; i < leaguesImagesArray.length; i++) {
	// let teams;
	// let title;
	// let league;
	// switch (i) {
	// 	case 0:
	// 		teams = englandTeams;
	// 		title = 'Английская Премьер-лига';
	// 		league = 'england';
	// 		break;
	// 	case 1:
	// 		teams = franceTeams;
	// 		title = 'Лига 1 (Франция)';
	// 		league = 'france';
	// 		break;
	// 	case 2:
	// 		teams = germanyTeams;
	// 		title = 'Немецкая Бундеслига';
	// 		league = 'germany';
	// 		break;
	// 	case 3:
	// 		teams = italyTeams;
	// 		title = 'Итальянская Серия А';
	// 		league = 'italy';
	// 		break;
	// 	case 4:
	// 		teams = portugalTeams;
	// 		title = 'Примейра Лига (Португалия)';
	// 		league = 'portugal';
	// 		break;
	// 	case 5:
	// 		teams = russiaTeams;
	// 		title = 'Российская Премьер-лига';
	// 		league = 'russia';
	// 		break;
	// 	case 6:
	// 		teams = spainTeams;
	// 		title = 'Испанская Ла Лига';
	// 		league = 'spain';
	// 		break;
	// 	default:
	// 		teams = ['', ''];
	// 		title = '';
	// 		league = '';
	// };

	// const teams: Array<string> = [
	// 	...englandTeams,
	// 	...franceTeams,
	// 	...germanyTeams,
	// 	...italyTeams,
	// 	...portugalTeams,
	// 	...russiaTeams,
	// 	...spainTeams,
	// ];

	for (let z = 0; z < matchesAmount; z++) { //leagueMatchesAmount
		let firstTeamId: number = getRandomIntInclusive(0, teams.length - 1);
		let secondTeamId: number = getRandomIntInclusive(0, teams.length - 1);
		while (secondTeamId === firstTeamId) {
			secondTeamId = getRandomIntInclusive(0, teams.length - 1);
		};

		const firstTeamWinProbability: number = getRandomIntInclusive(20, 80);
		const secondTeamWinProbability: number = 100 - firstTeamWinProbability;
		const probabilities: [number, number] = [
			firstTeamWinProbability,
			secondTeamWinProbability,
		];

		const coefficients: Array<Coefficient> = [
			{
				id: 0,
				outcomeName: 'firstTeamWin',
				outcomeNameRu: 'П1',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
			},
			{
				id: 1,
				outcomeName: 'tie',
				outcomeNameRu: 'П2',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
			},
			{
				id: 2,
				outcomeName: 'secondTeamWin',
				outcomeNameRu: 'Ничья',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
			},
			{
				id: 3,
				outcomeName: `totalMoreThan${betScore}`,
				outcomeNameRu: `Тотал Б${betScore}`,
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
			}
		];

		const match: Match = {
			matchId,
			firstTeamName: teams[firstTeamId],
			secondTeamName: teams[secondTeamId],
			probabilities,
			// league,
			coefficients,
		};
		matchId++;
		matchesArray.push(match);
	};
	// };
	return matchesArray;
};

//non-ts function (not required)
import {teamsArray, teamsAmount} from '../assets/images/flags';

export const createMatchComplicated = () => {
	let firstTeamId = getRandomIntInclusive(0, teamsAmount - 1);
	let secondTeamId = getRandomIntInclusive(0, teamsAmount - 1);
	while (secondTeamId === firstTeamId) {
		secondTeamId = getRandomIntInclusive(0, teamsAmount - 1);
	};

	const firstTeamWinProbability = getRandomIntInclusive(20, 80);
	const secondTeamWinProbability = 100 - firstTeamWinProbability;

	const firstTeamData = {
		...teamsArray[firstTeamId],
		winProbability: firstTeamWinProbability,
	};
	const secondTeamData = {
		...teamsArray[secondTeamId],
		winProbability: secondTeamWinProbability,
	};

	const coefficients = {
		whoWins: {
			firstTeam: {
				name: 'Команда 1',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Победит команда 1',
				enTitle: 'firstTeam',
			},
			tie: {
				name: 'Ничья',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Будет ничья',
				enTitle: 'tie',
			},
			secondTeam: {
				name: 'Команда 2',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Победит команда 2',
				enTitle: 'secondTeam',
			},
		},
		total: {
			moreThan0_5: {
				name: 'Больше 0.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал больше 0.5',
				enTitle: 'moreThan0_5',
			},
			lessThan0_5: {
				name: 'Меньше 0.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал меньше 0.5',
				enTitle: 'lessThan0_5',
			},
			moreThan1_5: {
				name: 'Больше 1.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал больше 1.5',
				enTitle: 'moreThan1_5',
			},
			lessThan1_5: {
				name: 'Меньше 1.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал меньше 1.5',
				enTitle: 'lessThan1_5',
			},
		},
		firstTeamTotal: {
			moreThan0_5: {
				name: 'Больше 0.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 1 Больше 0.5',
				enTitle: 'moreThan0_5',
			},
			lessThan0_5: {
				name: 'Меньше 0.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 1 меньше 0.5',
				enTitle: 'lessThan0_5',
			},
			moreThan1_5: {
				name: 'Больше 1.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 1 больше 1.5',
				enTitle: 'moreThan1_5',
			},
			lessThan1_5: {
				name: 'Меньше 1.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 1 меньше 1.5',
				enTitle: 'lessThan1_5',
			},
		},
		secondTeamTotal: {
			moreThan0_5: {
				name: 'Больше 0.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 2 больше 0.5',
				enTitle: 'moreThan0_5',
			},
			lessThan0_5: {
				name: 'Меньше 0.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 2 меньше 0.5',
				enTitle: 'lessThan0_5',
			},
			moreThan1_5: {
				name: 'Больше 1.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 2 больше 1.5',
				enTitle: 'moreThan1_5',
			},
			lessThan1_5: {
				name: 'Меньше 1.5',
				coefficient: +((getRandomIntInclusive(110, 420)) / 100).toFixed(2),
				title: 'Тотал Команды 2 меньше 1.5',
				enTitle: 'lessThan1_5',
			},
		},
	};

	return {
		firstTeamData,
		secondTeamData,
		coefficients,
	};
};


import { Match } from './commonTypes';

export const createMatchesSimple = (): Array<Match> => {
	let matchesArray: Array<Match> = [];

	for (let i = 0; i < matchesAmount; i++) {
		const firstTeamId: number =
			getRandomIntInclusive(0, teamNames.length - 1);
		let secondTeamId: number =
			getRandomIntInclusive(0, teamNames.length - 1);
		while (secondTeamId === firstTeamId) {
			secondTeamId = getRandomIntInclusive(0, teamNames.length);
		};

		const match: Match = {
			matchId: i,
			firstTeamName: teamNames[firstTeamId],
			secondTeamName: teamNames[secondTeamId],
		};
		matchesArray.push(match);
	};
	return matchesArray;
};
