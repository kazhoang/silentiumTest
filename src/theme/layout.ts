import { ViewStyle } from 'react-native';

export default {
	col: {
		flexDirection: 'column',
	},
	colReverse: {
		flexDirection: 'column-reverse',
	},
	wrap: {
		flexWrap: 'wrap',
	},
	row: {
		flexDirection: 'row',
	},
	rowReverse: {
		flexDirection: 'row-reverse',
	},
	itemsCenter: {
		alignItems: 'center',
	},
	itemsStart: {
		alignItems: 'flex-start',
	},
	itemsStretch: {
		alignItems: 'stretch',
	},
	itemsEnd: {
		alignItems: 'flex-end',
	},
	justifyCenter: {
		justifyContent: 'center',
	},
	justifyAround: {
		justifyContent: 'space-around',
	},
	justifyBetween: {
		justifyContent: 'space-between',
	},
	justifyEnd: {
		justifyContent: 'flex-end',
	},
	justifyStart: {
		justifyContent: 'flex-start',
	},
	spaceAround: {
		justifyContent: 'space-around',
	},
	overflowHidden: {
		overflow: 'hidden',
	},
	/* Sizes Layouts */
	flex_1: {
		flex: 1,
	},
	flex_2: {
		flex: 2,
	},
	flex_3: {
		flex: 3,
	},
	flex_4: {
		flex: 4,
	},
	/**
	 * As 25%
	 */
	quarterWidth: {
		width: '25%',
	},
	halfWidth: {
		width: '50%',
	},
	/**
	 * As 75%
	 */
	wideWidth: {
		width: '75%',
	},
	fullWidth: {
		width: '100%',
	},
	fullHeight: {
		height: '100%',
	},
	/* Positions */
	relative: {
		position: 'relative',
	},
	absolute: {
		position: 'absolute',
	},
	top0: {
		top: 0,
	},
	top68: {
		top: 68,
	},
	bottom0: {
		bottom: 0,
	},
	left0: {
		left: 0,
	},
	left16: {
		left: 16,
	},
	right0: {
		right: 0,
	},
	right16: {
		right: 16,
	},
	z1: {
		zIndex: 1,
	},
	z10: {
		zIndex: 10,
	},
	z100: {
		zIndex: 100,
	},
} as const satisfies Record<string, ViewStyle>;
