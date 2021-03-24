// @ts-ignore
import React, { useEffect, useRef } from 'react';

// @ts-ignore
import {View, Text, StyleSheet, Animated, ViewStyle, TextStyle} from 'react-native';

// @ts-ignore
import { windowWidth } from '../constants';
import { animateValue } from '../../helpers';


const initialProgress: number = 0;
const maxProgress: number = 90;
const animDuration: number = 3000;

export function CenteredLoadingBar(
	{alertText, progressBarColor, alertTextColor}:
		{alertText: string, progressBarColor: string, alertTextColor: string}
	// @ts-ignore
): JSX.Element {
	const progressBarWidth = useRef(new Animated.Value(initialProgress));

	const animProgressBar = (): void => {
		animateValue(
			progressBarWidth,
			maxProgress,
			animDuration,
		);
	};

	useEffect(() => {
		animProgressBar();
	}, []);

	return (
		<View style={styles.wrap}>
			<Text style={[styles.text, {
				color: alertTextColor,
			}]}>
				{alertText}
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
						backgroundColor: progressBarColor,
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
		paddingBottom: 12,
	},
	text: {
		fontSize: 16,
		marginBottom: 12,
	},
});
