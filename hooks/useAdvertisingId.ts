//@ts-nocheck
import {useState, useEffect} from 'react';

import {IDFA} from 'react-native-idfa';

/**
 * Custom hook that obtains Google Advertising ID
 * @returns Google Advertising ID
 */
export const useAdvertisingId = (): string => {
	const [advertising_id, setAdvertising_id] = useState<string>('');

	useEffect(() => {
		IDFA.getIDFA().then((idfa: string) => {
			setAdvertising_id(idfa);
		})
		.catch((er: Error) => console.error(er));
	}, []);

	return advertising_id;
};
