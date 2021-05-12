// @ts-nocheck
import {useState, useEffect} from 'react';
import {
	EmitterSubscription,
	NativeEventEmitter,
	NativeModules,
} from 'react-native';
import {
	JAVA_DEEP_LINK_TO_JS_EVENT_KEY,
	DEEP_LINK_TARGET_URI_KEY,
	DEEP_LINK_IS_NOT_AVAILABLE_KEY,
	fbDeepLinkParsingReplaces,
	fbDeepLinkParsingSeparator,
} from './src/constants';

// redux
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './src/redux/store';
import {
	setDeepLinkParsedData,
} from './src/redux/stateSlices';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import {log} from '../logger';

/**
 * Custom Hook that obtains deferred deep link url
 * @returns deferred deep link target URI trimmed from '?'
 */
export const useDeferredDeepLink = (): string => {
	// deep link event handler
	const handleJavaDeepLinkToJsEvent = (event: {[key: string]: string}) => {
		log.fb_app_link('Deep Link Event emitted from Java to JS: ', event);
		const targetUri: string = event[DEEP_LINK_TARGET_URI_KEY];
		if (targetUri === DEEP_LINK_IS_NOT_AVAILABLE_KEY) {
			log.fb_app_link('Deep Link Target URI is NOT available, ' +
			                'aborting obtain attempt');
			return;
		};
		if (targetUri) {
			log.fb_app_link('Deep Link Target URI RECEIVED: ' + targetUri);
			const parsedTargetUri: string = cutAndReplace(
				targetUri,
				fbDeepLinkParsingSeparator,
				fbDeepLinkParsingReplaces,
				'DeepLinkTargetUri',
			);
			log.fb_app_link('Deep Link Target URI parsed, ' +
			                'Setting storage.deepLinkParsedData, ' +
			                'Value: ' + parsedTargetUri);
			useAppDispatch(setDeepLinkParsedData(parsedTargetUri));
		};
	};

	const [javaDeepLinkToJsListener, setJavaDeepLinkToJsListener] =
		useState<EmitterSubscription | null>(null);

	useEffect(() => {
		if (!deepLinkParsedData) {
			log.fb_app_link('Subscribing to ' + JAVA_DEEP_LINK_TO_JS_EVENT_KEY +
			                ' JAVA EVENTS CHANNEL in ATTEMPT to ' +
			                'receive Deep Link Data');
			const javaDeepLinkToJsEmitter: NativeEventEmitter =
				new NativeEventEmitter(NativeModules.ToastExample);
			setJavaDeepLinkToJsListener(
				javaDeepLinkToJsEmitter.addListener(
					JAVA_DEEP_LINK_TO_JS_EVENT_KEY,
					handleJavaDeepLinkToJsEvent,
				)
			);
		};

		if (deepLinkParsedData) {
			log.fb_app_link('Cancelling (if was registered) ' +
			                JAVA_DEEP_LINK_TO_JS_EVENT_KEY +
			                ' JAVA EVENTS CHANNEL Subscription ' +
			                'since Facebook Deferred Deep Link (App Link) ' +
			                'Data is STORED');
			javaDeepLinkToJsListener?.remove();
		};

		return () => {
			log.fb_app_link('Cancelling ' + JAVA_DEEP_LINK_TO_JS_EVENT_KEY +
			                ' JAVA EVENTS CHANNEL Subscription ' +
			                'since Component UNMOUNTS');
			javaDeepLinkToJsListener?.remove();
		};
	}, [deepLinkParsedData]);
};
