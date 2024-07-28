import * as React from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	withRepeat,
} from 'react-native-reanimated';

type SkeletonVariant = 'text' | 'rect' | 'circle';

interface SkeletonProps {
	type?: SkeletonVariant;
	style?: ViewStyle | ViewStyle[];
}

export function Skeleton({ type = 'rect', style }: SkeletonProps) {
	const fadeAnim = useSharedValue(0);

	React.useEffect(() => {
		fadeAnim.value = withRepeat(
			withTiming(1, {
				duration: 1250,
				easing: Easing.inOut(Easing.quad),
			}),
			-1,
			true,
		);
	}, [fadeAnim]);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			opacity: fadeAnim.value,
		};
	});

	return <Animated.View style={[skeletonStyle(type), style, animatedStyles]} />;
}

export default Skeleton;

const skeletonStyle = (variant: SkeletonVariant): ViewStyle => {
	switch (variant) {
		case 'text':
			return { backgroundColor: '#ccc', height: 20, borderRadius: 4 };
		case 'rect':
			return {
				backgroundColor: '#ccc',
				height: 100,
				width: 100,
				borderRadius: 4,
			};
		case 'circle':
			return {
				backgroundColor: '#ccc',
				height: 100,
				width: 100,
				borderRadius: 50,
			};
		default:
			return { backgroundColor: '#ccc' };
	}
};
