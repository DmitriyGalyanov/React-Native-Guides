//@ts-nocheck
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface WebViewSliceState {
	isOnline: boolean, //ok
	//ok | is it? (can be local variable ? ) todo
	firebaseUrlBasis: string,
	// OneLink is AppsFlyers Deep Link technology
	parsedOneLinkAdCampaignName: string, //ok
	deepLinkParsedData: string, //ok
	theXValue: string, //can be packageName for example
	// | is it required? (can be local variable ? ) todo
	openAtInstallUrl: string, //ok
	didOpenInstallUrl: boolean,
	lastOpenedUrl: string,
	renderWebView: boolean, //ok
	renderGame: boolean, //ok
};
const initialState: WebViewSliceState = {
	isOnline: false, //TODO ADD CHECK AND PUT IT HERE
	firebaseUrlBasis: '',
	parsedOneLinkAdCampaignName: '',
	deepLinkParsedData: '',
	theXValue: '',
	openAtInstallUrl: '',
	didOpenInstallUrl: false,
	lastOpenedUrl: '',
	renderWebView: false,
	renderGame: false,
};

export const webViewSlice = createSlice({
	name: 'webViewData',
	initialState,
	reducers: {
		setIsOnline:
			(state, {payload}: PayloadAction<boolean>) => {
				state.isOnline = payload;
			},
		setFirebaseUrlBasis:
			(state, {payload}: PayloadAction<string>) => {
				state.firebaseUrlBasis = payload;
			}, //ok | is it?
		setParsedOneLinkAdCampaignName:
			(state, {payload}: PayloadAction<string>) => {
				state.parsedOneLinkAdCampaignName = payload;
			}, //ok
		setDeepLinkParsedData:
			(state, {payload}: PayloadAction<string>) => {
				state.deepLinkParsedData = payload;
			}, //ok
		setTheXValue:
			(state, {payload}: PayloadAction<string>) => {
				state.theXValue = payload;
			}, //ok | is it?
		setOpenAtInstallUrl:
			(state, {payload}: PayloadAction<string>) => {
				state.openAtInstallUrl = payload;
			}, //ok
		setDidOpenInstallUrl:
			(state, {payload}: PayloadAction<boolean>) => {
				state.didOpenInstallUrl = payload;
			}, //ok
		setLastOpenedUrl:
			(state, {payload}: PayloadAction<string>) => {
				state.lastOpenedUrl = payload;
			}, //ok
		setRenderWebView:
			(state, {payload}: PayloadAction<boolean>) => {
				state.renderWebView = payload;
			}, //ok
		setRenderGame:
			(state, {payload}: PayloadAction<boolean>) => {
				state.renderGame = payload;
			}, //ok
	},
});

export const {
	setIsOnline,
	setFirebaseUrlBasis,
	setParsedOneLinkAdCampaignName,
	setDeepLinkParsedData,
	setTheXValue,
	setOpenAtInstallUrl,
	setDidOpenInstallUrl,
	setLastOpenedUrl,
	setRenderWebView,
	setRenderGame,
} = webViewSlice.actions;

export const selectWebViewData =
	(state: { webViewSlice: WebViewSliceState; }) => state.webViewSlice;

export const webViewSliceReducer = webViewSlice.reducer;
