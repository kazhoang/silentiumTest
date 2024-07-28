import { DarkTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/types/theme/config';

const colorsLight = {
	primary: '#ff5e0c',
	red500: '#C13333',
	grayTransparent: '#4D4D4D80',
	gray900: '#333333',
	gray800: '#303030',
	gray400: '#4D4D4D',
	gray200: '#A1A1A1',
	gray100: '#DFDFDF',
	gray50: '#FAFAFA',
	purple: '#9393B9',
	card: '#4D4D4D',
	base: '#fff',
	reverse: '#333333',
	white: '#fff',
} as const;

const colorsDark = {
	primary: '#ff5e0c',
	red500: '#C13333',
	grayTransparent: '#4D4D4D80',
	gray900: '#F8F8F8',
	gray800: '#E0E0E0',
	gray400: '#969696',
	gray200: '#BABABA',
	gray100: '#212121',
	gray50: '#121212',
	purple: '#E1E1EF',
	base: '#121212',
	reverse: '#fff',
	white: '#fff',
} as const;

const sizes = [4, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 80] as const;

export const config = {
	colors: colorsLight,
	fonts: {
		sizes,
		colors: colorsLight,
	},
	gutters: sizes,
	backgrounds: colorsLight,
	borders: {
		widths: [1, 2],
		radius: [4, 8, 16, 20, 36],
		colors: colorsLight,
	},
	navigationColors: {
		...DarkTheme.colors,
		background: colorsLight.gray50,
		card: colorsLight.gray50,
	},
	variants: {
		dark: {
			colors: colorsDark,
			fonts: {
				colors: colorsDark,
			},
			backgrounds: colorsDark,
			navigationColors: {
				...DarkTheme.colors,
				background: colorsDark.base,
				card: colorsDark.base,
			},
		},
	},
} as const satisfies ThemeConfiguration;
