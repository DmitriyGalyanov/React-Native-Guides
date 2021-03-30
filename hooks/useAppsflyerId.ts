//@ts-nocheck
import {useState, useEffect} from 'react';

import appsFlyer from 'react-native-appsflyer';


/**
 * Custom hook that obtains AppsFlyer Unique ID
 * @returns AppsFlyer Unique ID
 */
export const useAppsflyerId = (): string => {
	const [appsflyer_id, setAppsflyer_id] = useState<string>('');

	useEffect(() => {
		appsFlyer.getAppsFlyerUID((err: Error, appsflyerUID: string) => {
			if (err) {
				console.error(err);
			} else {
				// console.log('on getAppsFlyerUID: ' + appsflyerUID);
				setAppsflyer_id(appsflyerUID);
			}
		});
	}, []);

	return appsflyer_id;
};
