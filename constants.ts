//@ts-nocheck
//window dimensions
import {Dimensions} from 'react-native';

const {
	width: windowWidth,
	height: windowHeight,
}: {width: number; height: number} = Dimensions.get('window');
export {windowWidth, windowHeight};

//styles
//colors
export enum colors {
	'white' = '#fff',
	'black' = '#000',
	'green' = '#25CC68',
	'gray' = '#9E9D9D',
	'red' = '#F92762',
};

// not game-logics related
export const appsflyerDevKey: string = 'key_here';

//loading alert
export const loadingAlertInitProgress: number = 5;
export const loadingAlertMaxProgress: number = 92;
export const loadingAlertAnimDuration: number = 2700;
export const loadingAlertText: string = 'loading...';
export const loadingAlertColor1: string = 'rgb(110,160,67)';
export const loadingAlertColor2: string = 'rgb(159,239,97)';
