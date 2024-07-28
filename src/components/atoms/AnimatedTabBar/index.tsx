import { useTheme } from '@/theme';
import { moderateScale } from '@/types/theme/responsive';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import {
	LayoutChangeEvent,
	Pressable,
	StyleSheet,
	View,
	Text,
	Platform,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const TAB_BAR_SIZE = moderateScale(60);

type TabBarComponentProps = {
	active?: boolean;
	name: string;
	onLayout: (e: LayoutChangeEvent) => void;
	onPress: () => void;
};

type LayoutEntry = {
	x: number;
	index: number;
};

const TabBarComponent = ({
	active,
	name,
	onLayout,
	onPress,
}: TabBarComponentProps) => {
	const { colors, fonts, layout, borders } = useTheme();
	const animatedComponentCircleStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: withTiming(active ? 1 : 0, { duration: 250 }),
				},
			],
		};
	});

	const animatedIconContainerStyles = useAnimatedStyle(() => {
		return {
			opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
		};
	});

	return (
		<Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
			<Animated.View
				style={[
					layout.flex_1,
					borders.rounded_36,
					{ backgroundColor: colors.reverse },
					animatedComponentCircleStyles,
				]}
			/>
			<Animated.View
				style={[styles.iconContainer, animatedIconContainerStyles]}
			>
				<Text style={[fonts.bold, fonts.gray50]}>{name}</Text>
			</Animated.View>
		</Pressable>
	);
};

const AnimatedTabBar = ({
	state: { index: activeIndex, routes },
	navigation,
}: BottomTabBarProps) => {
	const { bottom } = useSafeAreaInsets();
	const { navigationTheme, colors } = useTheme();

	const [layout, setLayout] = useState<LayoutEntry[]>([]);

	const handleLayout = (event: LayoutChangeEvent, index: number) => {
		const newLayout = [...layout];
		newLayout[index] = { x: event.nativeEvent.layout.x, index };
		setLayout(newLayout);
	};

	const xOffset = useDerivedValue(() => {
		if (layout.length !== routes.length) {
			return 0;
		}

		return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
	}, [activeIndex, layout]);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
		};
	});

	const paddingBottom = bottom + (Platform.OS === 'android' ? 12 : 0);

	return (
		<View>
			<View
				style={[
					{
						paddingBottom: paddingBottom,
						backgroundColor: colors.reverse,
					},
				]}
			>
				<AnimatedSvg
					width={110}
					height={60}
					viewBox="0 0 110 60"
					style={[styles.activeBackground, animatedStyles]}
				>
					<Path
						fill={navigationTheme.colors.background}
						d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
					/>
				</AnimatedSvg>
				<View style={styles.tabBarContainer}>
					{routes.map((route, index) => {
						const active = index === activeIndex;
						return (
							<TabBarComponent
								key={route.key}
								name={route.name}
								active={active}
								onLayout={e => handleLayout(e, index)}
								onPress={() => navigation.navigate(route.name)}
							/>
						);
					})}
				</View>
			</View>
		</View>
	);
};

export default AnimatedTabBar;

const styles = StyleSheet.create({
	activeBackground: {
		position: 'absolute',
	},
	tabBarContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	component: {
		height: TAB_BAR_SIZE,
		width: TAB_BAR_SIZE,
		marginTop: -(TAB_BAR_SIZE / 12),
	},
	iconContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
