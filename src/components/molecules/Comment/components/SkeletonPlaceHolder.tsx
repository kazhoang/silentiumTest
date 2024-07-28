import { Skeleton } from '@/components/atoms';
import { useTheme } from '@/theme';
import { View } from 'react-native';

const CommentSkeleton = () => {
	const { layout, gutters } = useTheme();
	return (
		<View style={[gutters.padding_16]}>
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

export default CommentSkeleton;
