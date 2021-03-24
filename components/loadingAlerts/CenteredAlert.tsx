// @ts-ignore
import React from 'react';

import {
	StyleSheet,
	View, ViewStyle,
	Text, TextStyle,
	ActivityIndicator,
	// @ts-ignore
} from 'react-native';

type indicatorSizeType = number | "small" | "large" | undefined;

export function CenteredAlert(
	{alertText, indicatorSize, color}:
		{alertText: string, indicatorSize: indicatorSizeType, color: string}
	// @ts-ignore
): JSX.Element {
	return (
		<View style={styles.wrap}>
			<Text style={[styles.text, {
				color,
			}]}>
				{alertText}
			</Text>
			<ActivityIndicator size={indicatorSize} color={color} />
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
		fontSize: 14,
		marginBottom: 12,
	},
});
