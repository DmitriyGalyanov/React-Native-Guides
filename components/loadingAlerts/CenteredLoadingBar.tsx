//@ts-nocheck
import React, { useEffect, useRef } from 'react';

import {
	View, Text, StyleSheet, Animated, ViewStyle, TextStyle} from 'react-native';

import {
	windowWidth,
	loadingAlertInitProgress,
	loadingAlertMaxProgress,
	loadingAlertAnimDuration,
	loadingAlertText,
	loadingAlertColor1,
	loadingAlertColor2,
} from '../constants';
import { animateValue } from '../helpers';


export function CenteredLoadingBar(): JSX.Element {
	const progressBarWidth =
		useRef(new Animated.Value(loadingAlertInitProgress));

	const animProgressBar = (): void => {
		animateValue(
			progressBarWidth,
			loadingAlertMaxProgress,
			loadingAlertAnimDuration,
		);
	};

	useEffect(() => {
		animProgressBar();
	}, []);

	return (
		<View style={styles.wrap}>
			<Text style={styles.text}>
				{loadingAlertText}
			</Text>
			<View
				style={{
					backgroundColor: 'white',
					width: windowWidth * 0.7,
					height: 20,
					borderRadius: 8,
					borderWidth: 1,
					borderColor: 'black',
					overflow: 'hidden',
				}}
			>
				<Animated.View
					style={{
						height: '100%',
						width: progressBarWidth.current.interpolate({
							inputRange: [0, 100],
							outputRange: ['0%', '100%'],
						}),
						backgroundColor: loadingAlertColor2,
					}}
				/>
			</View>
		</View>
	);
};

interface Styles {
	wrap: ViewStyle,
	text: TextStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 11,
	},
	text: {
		fontSize: 17,
		marginBottom: 13,
		color: loadingAlertColor1,
	},
});
