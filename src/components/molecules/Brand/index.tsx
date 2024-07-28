import { View, DimensionValue, ViewStyle } from 'react-native';

import { moderateScale } from '@/types/theme/responsive';
import Logo from './Logo';

type Props = {
	height?: DimensionValue;
	width?: DimensionValue;
	style?: ViewStyle | ViewStyle[];
};

function Brand({ height = 25, width = 160, style }: Props) {
	const brandHeight: number = moderateScale(height as number);
	const brandWidth: number = moderateScale(width as number);

	return (
		<View
			style={[
				{
					height: brandHeight,
					width: brandWidth,
				},
				style,
			]}
		>
			<Logo />
		</View>
	);
}

export default Brand;
