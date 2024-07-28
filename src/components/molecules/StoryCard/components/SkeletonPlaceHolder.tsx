import { Skeleton } from '@/components/atoms';
import { useTheme } from '@/theme';
import { View } from 'react-native';

const SkeletonPlaceHolder = ({ isHalfWidth }: { isHalfWidth: boolean }) => {
	const { layout, gutters } = useTheme();
	return (
		<View
			testID="skeleton-story-card"
			style={[
				gutters.padding_16,
				isHalfWidth ? layout.halfWidth : layout.fullWidth,
			]}
		>
			<Skeleton type="text" style={[gutters.marginTop_8, layout.halfWidth]} />
			<View style={gutters.marginTop_8}>
				<Skeleton
					type="text"
					style={[gutters.marginBottom_4, { height: 42 }]}
				/>
				<Skeleton
					type="text"
					style={[gutters.marginBottom_4, layout.quarterWidth, { height: 32 }]}
				/>
				<Skeleton
					type="text"
					style={[gutters.marginBottom_4, layout.wideWidth, { height: 42 }]}
				/>
			</View>
		</View>
	);
};

export default SkeletonPlaceHolder;
