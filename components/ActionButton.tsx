//@ts-nocheck
import React from 'react';

import {
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import { colors } from '../constants';

type ActionButtonProps = 	{
	onPress: Function,
	disabled?: boolean,
	mainColor: string,
	accentColor: string,
	title: string,
};


export function ActionButton(
	{onPress, disabled, mainColor, accentColor, title}: ActionButtonProps
): JSX.Element {
	return (
		<TouchableOpacity
			onPress={() => onPress()}
			disabled={disabled}
			style={[styles.wrap, {
				backgroundColor: mainColor,
				borderColor: accentColor,
				opacity: disabled ? 0.5 : 1,
				elevation: mainColor === 'transparent' ? 0 : 8,
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
		minWidth: 180,
		paddingVertical: 14,
		paddingHorizontal: 12,
		borderWidth: 2,
		borderRadius: 8,
		alignItems: 'center',
	},
	titleText: {
		fontSize: 22,
		fontWeight: 'bold',
		textShadowColor: colors.black,
		textShadowOffset: {
			width: 1,
			height: 1,
		},
		textShadowRadius: 4,
	},
});
