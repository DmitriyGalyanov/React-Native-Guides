// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';

import {
	StyleSheet,
	ImageBackground,
	View, ViewStyle,
	Text, TextStyle,
	Image, Animated,
	TouchableOpacity,
	Modal,
} from 'react-native';
// import { Overlay } from '../components';

import {
	actionButtonBg,
	background,
	ballWithTrail,
	machine,
	racket,
} from '../../assets/images';

//
import {Dimensions} from 'react-native';

const {
	width: windowWidth,
	height: windowHeight,
}: {width: number; height: number} = Dimensions.get('window');

//styles
//colors
enum colors {
	white = '#fff',
	black = '#000',
	green = '#25CC68',
	gray = '#9E9D9D',
	red = '#F92762',
	orange = '#FFAE00',
	blue = '#0070FF',
	overlayBgColor = 'rgba(12, 24, 58, 0.6)',
};
const white: colors = colors.white; //todo: refactor
const orange: colors = colors.orange;
const black: colors = colors.black;
const overlayBgColor: colors = colors.overlayBgColor;
const blue: colors = colors.blue;
//game
const roundStartDelay: number = 500;
const ballToRacketFlightDuration: number = 1000;

const pointsPerRound: number = 100;

//machine
const machineSide: number = windowWidth * 0.35;
const machineTopOffset: number = windowHeight * 0.16;

//ball
const ballWidth: number = windowWidth * 0.12;
const ballHeight: number = ballWidth * 1.77;
const ballInitTopOffset: number =
	machineTopOffset + machineSide - ballHeight;

//racket
const racketWidth: number = windowWidth * 0.35;
const racketHeight: number = racketWidth * 1.46;
const racketBottomOffset: number = windowHeight * 0.02;
const racketTopOffset: number =
	windowHeight - (racketBottomOffset + racketHeight);
//required for ball position tracking

//action button
const actionButtonWidth: number = windowWidth * 0.86;
const actionButtonHeight: number = actionButtonWidth * 0.5 * 1.2;
import { animateValue, getRandomIntInclusive } from '../helpers';


type BallDirection =
	'157 deg' | '135 deg' | '203 deg' | '215 deg' | '0 deg';
enum BallRotateKey {
	'highLeft' = '157 deg',
	'lowLeft' = '135 deg',
	'highRight' = '203 deg',
	'lowRight' = '215 deg',
	'init' = '0 deg',
};

enum ballTopOffsetKeys {
	'init' = 0,
	'racketTop' = 1,
	'racketBottom' = 2,
	'floor' = 3,
};

enum ballLeftOffsetKeys {
	'left' = 0,
	'init' = 1,
	'right' = 2,
};

export function Game() : JSX.Element{
	//define (init) state
	const [gameOn, setGameOn] = useState<boolean>(false);
	const [ballFlies, setBallFlies] = useState<boolean>(false);
	const [ballClose, setBallClose] = useState<boolean>(false);
	const [racketPressed, setRacketPressed] = useState<boolean>(false);
	const [didHitTheBall, setDidHitTheBall] = useState<boolean>(false);
	const [didLose, setDidLose] = useState<boolean>(false);
	const [ballRotate, setBallRotate] =
		useState<BallDirection>(BallRotateKey.init);
	const [score, setScore] = useState<number>(0);

	//anim-start
	//anim-values
	const ballAwayFlightDuration = ballToRacketFlightDuration / 2;
	const ballTopOffsets:
		{init: number, racketTop: number, racketBottom: number, floor: number} =
		{
			init: ballInitTopOffset,
			racketTop: racketTopOffset - ballHeight,
			racketBottom: windowHeight - ballHeight,
			floor: windowHeight + (ballHeight),
		};
	const ballTopOffset =
		useRef<Animated.Value>(new Animated.Value(ballTopOffsetKeys.init));
	const ballLeftOffset =
		useRef<Animated.Value>(new Animated.Value(ballLeftOffsetKeys.init));
	const resetBallPosition = () => {
		setBallRotate(BallRotateKey.init);
		ballTopOffset.current.setValue(ballTopOffsetKeys.init);
		ballLeftOffset.current.setValue(ballLeftOffsetKeys.init);
	};

	//anim-functions
	const animBallToRacketFlight = () => {
		animateValue(
			ballTopOffset,
			ballTopOffsetKeys.floor,
			ballToRacketFlightDuration,
		);
	};
	const animBallAwayFlight = () => {
		const randomLeft =
			getRandomIntInclusive(1, 100) <= 50
				? ballLeftOffsetKeys.left : ballLeftOffsetKeys.right;
		const randomTop =
			getRandomIntInclusive(1, 100) <= 50 ? 3 : 7;
		if (randomLeft === ballLeftOffsetKeys.left && randomTop === 3) {
			setBallRotate(BallRotateKey.highLeft);
		} else if (randomLeft === ballLeftOffsetKeys.left && randomTop === 7) {
			setBallRotate(BallRotateKey.lowLeft);
		} else if (randomLeft === ballLeftOffsetKeys.right && randomTop === 3) {
			setBallRotate(BallRotateKey.highRight);
		} else if (randomLeft === ballLeftOffsetKeys.right && randomTop === 7) {
			setBallRotate(BallRotateKey.lowRight);
		};
		animateValue(
			ballTopOffset,
			randomTop / 10,
			ballAwayFlightDuration,
		);
		animateValue(
			ballLeftOffset,
			randomLeft,
			ballAwayFlightDuration,
		);
	};

	//anim-listeners
	useEffect(() => {
		ballTopOffset.current.addListener(
			({ value }: { value: number }) => {
				if (value >= ballTopOffsetKeys.racketTop) {
					setBallClose(true);
				};
				if (value >= ballTopOffsetKeys.racketBottom) {
					handleLoss();
				};
			});
	}, []);
	useEffect(() => {
		ballLeftOffset.current.addListener(
			({ value }: { value: number }) => {
				if (value === ballLeftOffsetKeys.right
				    || value === ballLeftOffsetKeys.left) {
					startNextRound();
				};
			});
	}, []);
	//anim-end


	//game-start
	//game-funcs
	const resetTheGame = () => {
		setGameOn(false);
		setBallFlies(false);
		setBallClose(false);
		setRacketPressed(false);
		setDidHitTheBall(false);
		setDidLose(false);
		setScore(0);
	};
	const startTheGame = () => {
		resetTheGame();
		setGameOn(true);
		setTimeout(() => {
			fireABall();
		}, roundStartDelay);
	};
	const startNextRound = () => {
		resetBallPosition();
		setRacketPressed(false);
		setDidHitTheBall(false);
		setTimeout(() => {
			fireABall();
		}, roundStartDelay);
	};

	const fireABall = () => {
		setRacketPressed(false);
		setBallClose(false);
		setBallFlies(true);
		animBallToRacketFlight();
	};

	const handleLoss = () => {
		setGameOn(false);
		setBallFlies(false);
		setBallClose(false);
		setDidHitTheBall(false);
		setDidLose(true);
		resetBallPosition();
	};

	//handle user interaction
	const handleEarlyRacketPress = () => {
		setRacketPressed(true);
		handleLoss();
	};
	const handleTimedRacketPress = () => {
		setScore((prevState: number) => prevState + pointsPerRound);
		setDidHitTheBall(true);
		animBallAwayFlight();
	};
	const handleRacketPress = () => {
		if (ballFlies && !ballClose) {
			handleEarlyRacketPress();
		} else if (ballFlies && ballClose) {
			handleTimedRacketPress();
		};
	};

	return (
		<ImageBackground
			source={background}
			style={styles.wrap}
		>
			<View style={styles.scoreWrap}>
				<Text style={styles.scoreHeader}>
					SCORE
				</Text>
				<Text style={styles.scoreNumber}>
					{score}
				</Text>
			</View>
			<View
				style={{
					position: 'absolute',
					left: (windowWidth - machineSide) / 2,
					top: machineTopOffset,
				}}
			>
				<Image
					source={machine}
					width={machineSide}
					height={machineSide}
					style={{
						width: machineSide,
						height: machineSide,
					}}
				/>
			</View>
			{ballFlies && (
				<Animated.View
					style={{
						position: 'absolute',
						left: ballLeftOffset.current.interpolate({
							inputRange: [0, 1, 2],
							outputRange: [
								-ballWidth,
								(windowWidth - ballWidth) / 2,
								windowWidth + ballWidth,
							],
						}),
						top: ballTopOffset.current.interpolate({
							inputRange: [0, 1, 2, 3],
							outputRange: [
								ballTopOffsets.init,
								ballTopOffsets.racketTop,
								ballTopOffsets.racketBottom,
								ballTopOffsets.floor,
							],
						}),
						alignItems: 'center',
						transform: [
							{
								rotateZ: ballRotate,
							},
						],
					}}
				>
					<Image
						source={ballWithTrail}
						width={ballWidth}
						height={ballHeight}
						style={{
							width: ballWidth,
							height: ballHeight,
						}}
					/>
				</Animated.View>
			)}
			{(gameOn && !didHitTheBall && !didLose) && (
				<TouchableOpacity
					onPress={handleRacketPress}
					style={styles.actionButtonWrap}
				>
					<ImageBackground
						source={actionButtonBg}
						width={actionButtonWidth}
						height={actionButtonHeight}
						resizeMode='stretch'
						style={[styles.actionButtonBg, {
							width: actionButtonWidth,
							height: actionButtonHeight,
						}]}
					>
						<Text style={styles.actionButtonText}>
							Нажмите
						</Text>
						<Text style={styles.actionButtonText}>
							чтобы отбить
						</Text>
					</ImageBackground>
				</TouchableOpacity>
			)}
			<View
				style={{
					position: 'absolute',
					left: (windowWidth - racketWidth) / 2,
					bottom: racketBottomOffset,
				}}
			>
				<Image
					source={racket}
					width={racketWidth}
					height={racketHeight}
					style={{
						width: racketWidth,
						height: racketHeight,
					}}
				/>
			</View>
			{/* <Modal
				animationType='fade'
				transparent
				visible={!gameOn}
			>
				<Overlay
					startTheGame={startTheGame}
					score={score}
					text={racketPressed
						? 'Вы нажали слишком рано'
						: 'Вы не успели отбить'}
					didLose={didLose}
				/>
			</Modal> */}
		</ImageBackground>
	);
}

type Styles = {
	wrap: ViewStyle,
	scoreWrap: ViewStyle,
	scoreHeader: TextStyle,
	scoreNumber: TextStyle,
	actionButtonWrap: ViewStyle,
	actionButtonBg: ViewStyle,
	actionButtonText: TextStyle,
};

const styles = StyleSheet.create<Styles>({
	wrap: {
		flex: 1,
	},

	scoreWrap: {
		marginTop: 11,
		alignItems: 'center',
	},
	scoreHeader: {
		color: white,
		fontWeight: 'bold',
		fontSize: 31,
	},
	scoreNumber: {
		color: orange,
		fontWeight: 'bold',
		fontSize: 28,
	},

	actionButtonWrap: {
		position: 'absolute',
		left: (windowWidth - actionButtonWidth) / 2,
		bottom: racketBottomOffset * 2,
		zIndex: 5,
	},
	actionButtonBg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionButtonText: {
		color: white,
		fontSize: 35,
		fontWeight: 'bold',
		textShadowRadius: 4,
		textShadowOffset: {
			width: 1,
			height: 1,
		},
		textShadowColor: black,
	},
});
