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

//loading alert(s)
//duplicated values are commented
//CenteredLoadingBar
export const loadingAlertInitProgress: number = 5;
export const loadingAlertMaxProgress: number = 92;
export const loadingAlertAnimDuration: number = 2700;
export const loadingAlertText: string = 'loading...';
export const loadingAlertColor1: string = 'rgb(110,160,67)';
export const loadingAlertColor2: string = 'rgb(159,239,97)';

//CenteredAlert
// export const loadingAlertText: string = 'loading...';
// export const loadingAlertColor1: string = 'rgb(166,196,57)';
// export const loadingAlertColor2: string = 'rgb(155,191,55)';
//number between 20 and 36
export const loadingAlertIndicatorSize: 'small' | 'large' | number = 'small';


// single match creation for apps with coefficients dropdowns -- start

export const teamNames: Array<string> = [
	'Авангард',
	'Авто',
	'Автомобилист',
	'Адмирал',
	'Ак Барс',
	'Алмаз',
	'Алтай',
	'Амур',
	'Барс',
	'Буран',
	'Витязь',
	'Горняк',
	'Дизелист',
	'Дизель',
	'Динамо',
	'Ермак',
	'Зауралье',
	'Звезда',
	'Ижсталь',
	'Ирбис',
	'Кристалл',
	'Лада',
	'Ладья',
	'Локо',
	'Липецк',
	'Олимпия',
	'Спартак',
	'Нефтяник',
	'Полёт',
	'Прогресс',
	'Реактор',
	'Ростов',
	'Рубин',
	'Сарматы',
	'Сокол',
	'Спутник',
	'Толпар',
	'Торос',
	'Торпедо',
	'Трактор',
	'Химик',
	'Брянск',
	'Рязань',
	'Сочи',
	'Тамбов',
	'Чайка',
	'Челмет',
	'Челны',
	'Югра',
	'Юниор',
];

// single match creation for apps with coefficients dropdowns -- end