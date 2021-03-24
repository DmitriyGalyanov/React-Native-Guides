// @ts-ignore
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import { RootState } from '../store';


export interface WebViewSliceState {
	remoteConfigUrl: string,
	deepLinkGatheredData: string,
	finalUrl: string,
	shouldRenderWebViewExclusively: boolean,
};
const initialState: WebViewSliceState = {
	remoteConfigUrl: '',
	deepLinkGatheredData: '',
	finalUrl: '',
	shouldRenderWebViewExclusively: false,
};

export const webViewSlice = createSlice({
	name: 'webViewData',
	initialState,
	reducers: {
		setRemoteConfigUrl: (
			state,
			{payload}: PayloadAction<string>) => {
			state.remoteConfigUrl = payload;
		},
		setFinalUrl: (state, {payload}: PayloadAction<string>) => {
			state.finalUrl = payload;
		},
		setShouldRenderWebViewExclusively: (
			state,
			{payload}: PayloadAction<boolean>) => {
			state.shouldRenderWebViewExclusively = payload;
		},
	},
});

export const {
	setRemoteConfigUrl,
	setFinalUrl,
	setShouldRenderWebViewExclusively,
} = webViewSlice.actions;

export const selectWebViewData =
	(state: { webViewSlice: WebViewSliceState; }) => state.webViewSlice;
// export const selectWebViewData = (state: RootState) => state.webViewSlice;

export const webViewSliceReducer = webViewSlice.reducer;
