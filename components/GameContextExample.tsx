//@ts-nocheck
import React, { Dispatch, useContext } from 'react';

import {
	StyleSheet,
	Text, TextStyle,
	TouchableOpacity,
	View, ViewStyle,
} from 'react-native';

import {
	GameAction,
	GameState,
	GameStateContext,
	GameStateDispatch,
} from '../contexts/gameState';


export function MatchTile(
	{matchId}: {matchId: number}): JSX.Element {

	const {selectedMatchId} =
		useContext<GameState>(GameStateContext);

	const dispatch =
		useContext<Dispatch<GameAction> | null>(GameStateDispatch);

	const handleTestDispatch = () => {
		if (dispatch) {
			dispatch({
				type: 'setSelectedMatchId',
				payload: matchId,
			});
		};
	};

	return (
		<View style={styles.wrap}>
			<Text>
				{`matchId: ${matchId}; selectedMatchId: ${selectedMatchId};`}
			</Text>
			<TouchableOpacity
				style={styles.buttonWrap}
				onPress={() => handleTestDispatch()}
			>
				<Text style={styles.buttonText}>
					{`Select match with id: ${matchId}!`}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

type Styles = {
	wrap: ViewStyle,
	buttonWrap: ViewStyle,
	buttonText: TextStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		width: matchTileWidth,
	},
	buttonWrap: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderRadius: 8,
		width: 240,
		paddingVertical: 20,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 16,
	},
});
