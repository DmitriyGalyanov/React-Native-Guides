//THAT ONE IS FOR NOT-DEFERRED DEEP LINKS

// @ts-ignore
import {useState, useEffect} from 'react';

// @ts-ignore
import {Linking} from 'react-native';


/**
 * Custom Hook that obtains deep link url data
 * and returns deep link target URI trimmed from '?'
 */
export const useDeepLinkUrlData = (): string => {
	const [deepLinkUrlData, setDeepLinkUrlData] = useState<string | null>('');

	useEffect(() => {
		Linking.addEventListener('url', (initDeepLinkUrlObj: { url: string }) => {
			console.log('THROUGH LISTENER');
			setDeepLinkUrlData(initDeepLinkUrlObj.url);
		});

		return () => {
			Linking.removeAllListeners('url');
		};
	}, []);

	useEffect(() => {
		Linking.getInitialURL()
		.then(initDeepLinkUrl => {
			console.log('through get initial url');
			setDeepLinkUrlData(initDeepLinkUrl);
		});
	}, []);

	useEffect(() => {
		if (deepLinkUrlData && deepLinkUrlData.indexOf('?') !== -1) {
			setDeepLinkUrlData(deepLinkUrlData.split('?')[1]);
		};
	}, [deepLinkUrlData]);

	useEffect(() => {
		if (deepLinkUrlData && deepLinkUrlData.indexOf('&target_url') !== -1) {
			setDeepLinkUrlData(deepLinkUrlData.split('&target_url')[0]);
		};
	}, [deepLinkUrlData]);

	if (deepLinkUrlData?.indexOf('?') !== -1
	    || deepLinkUrlData?.indexOf('target_url') !== -1) {
		return '';
	};

	return deepLinkUrlData;
};
