//@ts-nocheck
/* dimensions */
//window dimensions
import {Dimensions} from 'react-native';
import { Replaces } from './commonTypes';

const {
	width: windowWidth,
	height: windowHeight,
}: {width: number; height: number} = Dimensions.get('window');
export {windowWidth, windowHeight};

//game dimensions



/* styles */
//colors
export enum colors {
	white = '#fff',
	black = '#000',
	green = '#25CC68',
	gray = '#9E9D9D',
	red = '#F92762',
	modalBgColor = 'rgba(45, 1, 22, 0.8)',
};


/* not game-logics related */
export const appsflyerDevKey: string = 'hLTkg5KEsQa3VfyHMbofJ3';
export const requiredXValue: number = 11;

// values used for AppsFlyer OneLink and Facebook Deep Link data parsing
// via helpers.cutAndReplace()
// essential to Deep Link Event Handling
export const JAVA_DEEP_LINK_TO_JS_EVENT_KEY = "JavaDeepLinkToJs";
export const DEEP_LINK_TARGET_URI_KEY = "deepLinkTargetUri";
export const DEEP_LINK_IS_NOT_AVAILABLE_KEY = "is not available";

// essential to helpers.cutAndReplace()
export const oneLinkAdNameParsingSeparator: string = '|S|';
export const oneLinkAdSetNameParsingSeparator: string =
	oneLinkAdNameParsingSeparator;
export const oneLinkAdCampaignNameParsingSeparator: string =
	oneLinkAdNameParsingSeparator;
export const oneLinkAdNameParsingReplaces: Replaces = {
	searchValue: '|U|', replaceValue: '&',
};
export const oneLinkAdSetNameParsingReplaces: Replaces =
	oneLinkAdNameParsingReplaces;
export const oneLinkAdCampaignNameParsingReplaces: Replaces =
	oneLinkAdNameParsingReplaces;

export const fbDeepLinkParsingSeparator: string = '|S|';
export const fbDeepLinkParsingReplaces: Replaces = {
	searchValue: '|U|', replaceValue: '&',
};

//loading alert
//essential values
export const loadingAlertText: string = 'loading...';
export const loadingAlertColor1: string = 'rgb(57,103,196)';
export const loadingAlertColor2: string = 'rgb(55,143,191)';
//some of those (possibly -- all) should be removed when a Component is chosen
//Component dependant values
//CenteredAlert
// number between 20 and 36
export const loadingAlertIndicatorSize: 'small' | 'large' | number = 24;
//CenteredLoadingBar
// range: 0 -- 100
export const loadingAlertInitProgress: number = 5;
// range: loadingAlertInitProgress -- 100
export const loadingAlertMaxProgress: number = 92;
export const loadingAlertAnimDuration: number = 2700;



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