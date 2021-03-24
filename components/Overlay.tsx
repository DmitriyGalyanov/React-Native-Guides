// @ts-ignore
import React from 'react';

import {
	StyleSheet,
	View, ViewStyle,
	Text, TextStyle,
	// @ts-ignore
} from 'react-native';
// @ts-ignore
import { ScoreIndicator } from './ScoreIndicator';
import { ActionButton } from './ActionButton';


import {
	orange,
	overlayBgColor,
	white,
	windowHeight,
	windowWidth,
	// @ts-ignore
} from '../constants';

/*That Component should be a 'react-native'.Modal child
eg:
<Modal
	animationType='fade'
	transparent
	visible={modalVisible}
>
	<Overlay />
</Modal> */
// @ts-ignore
export function Overlay(): JSX.Element {

	return (
		<View style={styles.wrap}>
			<Text>
				Text example
			</Text>
		</View>
	);
}

type Styles = {
	wrap: ViewStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		position: 'absolute',
		width: windowWidth,
		height: windowHeight,
		backgroundColor: overlayBgColor,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingBottom: windowHeight * 0.3,
		paddingTop: windowHeight * 0.1,
	},
});
