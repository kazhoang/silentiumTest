import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentTheme } from '@/types/theme/theme';
import { moderateScale } from '@/types/theme/responsive';

export default ({
	layout,
	backgrounds,
	fonts,
	gutters,
	borders,
	colors,
}: ComponentTheme) => {
	return {
		buttonCircle: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.grayTransparent,
			...fonts.gray400,
			...borders.rounded_36,
			height: moderateScale(42),
			width: moderateScale(42),
		},
		linearStyle: {
			height: '40%',
			...layout.absolute,
			...layout.bottom0,
			...layout.left0,
			...layout.right0,
			...layout.z10,
		},
		image24: {
			height: moderateScale(24),
			width: moderateScale(24),
		},
		image32: {
			height: moderateScale(32),
			width: moderateScale(32),
			tintColor: colors.gray50,
		},
		divider: {
			...borders.bottom_1,
			...borders.gray400,
			...gutters.marginVertical_16,
		},
	} as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>;
};
