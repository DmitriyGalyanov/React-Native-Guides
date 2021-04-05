//@ts-nocheck
import React, { useState, useEffect } from 'react';

import { StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native';

import {
	loadingAlertColor1,
	loadingAlertColor2,
	loadingAlertText,
} from '../constants';


const initialProgress: number = 0;
const maxProgress: number = 90;
const animTickDuration: number = 20;
const progressInTick: number = 1;

export function PercentageLoadingAlert(): JSX.Element {
	const [progress, setProgress] = useState<number>(initialProgress);

	useEffect(() => {
		let progressTimeout: NodeJS.Timeout;
		if (progress < maxProgress) {
			progressTimeout = setTimeout(() => {
				setProgress(progress + progressInTick);
			}, animTickDuration);
		};

		return () => {
			clearTimeout(progressTimeout);
		};
	}, [progress]);

	return (
		<View style={styles.wrap}>
			<Text style={[styles.alertText, {
				color: loadingAlertColor1,
			}]}>
				{loadingAlertText}
			</Text>
			<Text
				style={{
					color: loadingAlertColor2,
				}}
			>
				{progress}%
			</Text>
		</View>
	);
};

type Styles = {
	wrap: ViewStyle,
	alertText: TextStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 12,
	},
	alertText: {
		fontSize: 16,
		marginBottom: 12,
	},
});
