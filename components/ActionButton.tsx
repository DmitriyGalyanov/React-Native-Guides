// @ts-ignore
import React from 'react';

import {
	StyleSheet,
	ViewStyle,
	TextStyle,
	TouchableOpacity,
	Text,
	// @ts-ignore
} from 'react-native';

type ActionButtonProps = 	{
	onPress: Function,
	disabled?: boolean,
	mainColor: string,
	accentColor: string,
	title: string,
};


export function ActionButton(
	{onPress, disabled, mainColor, accentColor, title}: ActionButtonProps
	// @ts-ignore
): JSX.Element {
	return (
		<TouchableOpacity
			onPress={() => onPress()}
			disabled={disabled}
			style={[styles.wrap, {
				backgroundColor: mainColor,
				borderColor: accentColor,
				opacity: disabled ? 0.5 : 1,
			}]}
		>
			<Text style={[styles.titleText, {
				color: accentColor,
			}]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

type Styles = {
	wrap: ViewStyle,
	titleText: TextStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		minWidth: 140,
		paddingVertical: 14,
		paddingHorizontal: 12,
		borderWidth: 2,
		borderRadius: 8,
		alignItems: 'center',
		elevation: 8,
	},
	titleText: {
		fontSize: 22,
		fontWeight: 'bold',
	},
});

