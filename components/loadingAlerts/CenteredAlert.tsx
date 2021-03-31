//@ts-nocheck
import React from 'react';

import {
	StyleSheet,
	View, ViewStyle,
	Text, TextStyle,
	ActivityIndicator,
} from 'react-native';

import {
	loadingAlertColor1,
	loadingAlertText,
	loadingAlertIndicatorSize,
	loadingAlertColor2,
} from '../constants';


export function CenteredAlert(): JSX.Element {
	return (
		<View style={styles.wrap}>
			<Text style={[styles.text, {
				color: loadingAlertColor1,
			}]}>
				{loadingAlertText}
			</Text>
			<ActivityIndicator
				size={loadingAlertIndicatorSize}
				color={loadingAlertColor2}
			/>
		</View>
	);
};

type Styles = {
	wrap: ViewStyle,
	text: TextStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 12,
	},
	text: {
		fontSize: 15,
		marginBottom: 12,
	},
});
