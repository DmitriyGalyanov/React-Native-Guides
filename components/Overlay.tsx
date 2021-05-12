//@ts-nocheck
import React from 'react';

import {
	StyleSheet,
	Text, TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

import {
	colors,
	windowHeight,
	windowWidth,
} from '../constants';


type ModalChildProps = {
	closeModal: () => void,
};


/*That Component should be a 'react-native'.Modal child
eg:
<Modal
	animationType='fade'
	transparent
	visible={showModal}
	onRequestClose={closeModal}
>
	<ModalChild closeOverlay={closeModal}/>
</Modal>
*/
export const ModalChild: React.FC<ModalChildProps> = ({ closeModal }) => {

	return (
		<View style={styles.wrap}>
			<Text>
				SCORE INFO
			</Text>
			<TouchableOpacity onPress={closeModal}>
				<Text>
					Close Modal Button
				</Text>
			</TouchableOpacity>
		</View>
	);
};

type Styles = {
	wrap: ViewStyle,
	titleText: TextStyle,
	closeModalButtonWrap: ViewStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		position: 'absolute',
		width: windowWidth,
		height: windowHeight,
		backgroundColor: colors.modalBgColor,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingBottom: windowHeight * 0.3,
		paddingTop: windowHeight * 0.1,
	},
	titleText: {

	},
	closeModalButtonWrap: {

	},
});
