//@ts-nocheck
import {useState, useEffect} from 'react';

import { DeviceEventEmitter, EmitterSubscription } from 'react-native';

import {log} from '../logger';

const EVENT_KEY: string = 'JavaDeepLinkToJs';
const DEEP_LINK_TARGET_URI_KEY: string = 'deepLinkTargetUri';
const IS_NOT_AVAILABLE: string = 'is not available';

/**
 * Custom Hook that obtains deferred deep link url
 * @returns deferred deep link target URI trimmed from '?'
 */
export const useDeferredDeepLink = (): string => {
	const [deepLinkUrl, setDeepLinkUrl] = useState<string>('');

	useEffect(() => {
		const listener: EmitterSubscription = DeviceEventEmitter
		.addListener(EVENT_KEY, handleEvent);
		return () => {
			// it works fine but TS is yelling
			// @ts-ignore
			DeviceEventEmitter.removeListener(listener);
			//may be that's the correct way???
			// DeviceEventEmitter.removeListener(
			// 	EVENT_KEY,
			// 	handleEvent,
			// );
		};
	}, []);

	const handleEvent = (event: any) => {
		log.use_deep_link_url_hook('Event: ', event);
		const targetUri: string = event[DEEP_LINK_TARGET_URI_KEY];
		log.use_deep_link_url_hook('Deep Link Target URI: ' + targetUri);
		if (targetUri === IS_NOT_AVAILABLE) return;
		setDeepLinkUrl(targetUri);
	};

	useEffect(() => {
		if (deepLinkUrl && deepLinkUrl?.indexOf('?') !== -1) {
			const targetUriTrimmed: string = deepLinkUrl.split('?')[1];
			log.use_deep_link_url_hook('Target Uri Trimmed from \'?\': '
			                           + targetUriTrimmed);
			setDeepLinkUrl(targetUriTrimmed);
		};
	}, [deepLinkUrl]);

	if (deepLinkUrl === '' ||
	    deepLinkUrl === IS_NOT_AVAILABLE ||
	    deepLinkUrl?.indexOf('?') !== -1) {
		log.use_deep_link_url_hook('Return at final check,'
			+ 'either deepLinkUrl === \'\', deepLinkUrl === IS_NOT_AVAILABLE'
			+ 'or deepLinkUrl still has \'?\' in it (not trimmed)'
			+ 'current deepLinkUrl: ' + deepLinkUrl);
		return '';
	};
	log.use_deep_link_url_hook(
		'This string must be returned from useDeepLinkUrl() hook: ' + deepLinkUrl);
	return deepLinkUrl;
};
