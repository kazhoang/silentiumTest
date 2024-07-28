import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';

function ThemeModeButton() {
	const { changeTheme, variant, fonts } = useTheme();

	const onChangeTheme = () => {
		changeTheme(variant === 'dark' ? 'default' : 'dark');
	};
	const handlePress = () => {
		onChangeTheme();
	};
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={1}
			testID="theme-mode-button"
		>
			<Text style={[fonts.size_48, fonts.gray400]}>
				{`${variant === 'dark' ? 'Dark' : 'Light'} Mode`}
			</Text>
		</TouchableOpacity>
	);
}

export default ThemeModeButton;
