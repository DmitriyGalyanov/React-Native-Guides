// @ts-ignore
import React, { useState, useEffect } from 'react';

// @ts-ignore
import { StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native';


const initialProgress: number = 0;
const maxProgress: number = 90;
const animTickDuration: number = 20;
const progressInTick: number = 1;

export function PercentageLoadingAlert(
	{alertText, alertTextColor, percentageTextColor}:
	{alertText: string, alertTextColor: string, percentageTextColor: string}
	// @ts-ignore
): JSX.Element {
	const [progress, setProgress] = useState<number>(initialProgress);

	useEffect(() => {
		// @ts-ignore
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
				color: alertTextColor,
			}]}>
				{alertText}
			</Text>
			<Text
				style={{
					color: percentageTextColor,
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
