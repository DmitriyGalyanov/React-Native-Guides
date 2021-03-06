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

//the component should be a descendant (at any nesting level) of Context(s) Provider(s) in order to consume Context(s) value(s)
/*
<GameStateContext.Provider value={state}>
	<GameStateDispatch.Provider value={dispatch}>
		<SomeComponent>
			...
			<>
			...
			<MatchTile matchId={matchId} /> // MatchTile is our example Component
			</>
		</SomeComponent>
	</GameStateDispatch.Provider>
</GameStateContext.Provider>
*/


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
