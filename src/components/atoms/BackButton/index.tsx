import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import BackImage from '@/theme/assets/images/back.png';
import { useAppNavigation } from '@/navigators/Application';

function BackButton() {
	const navigation = useAppNavigation();
	const { components, layout, colors } = useTheme();

	return (
		<View style={[layout.absolute, layout.left16, layout.top68, layout.z100]}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={components.buttonCircle}
			>
				<Image
					source={BackImage}
					style={[components.image24]}
					tintColor={colors.white}
				/>
			</TouchableOpacity>
		</View>
	);
}

export default BackButton;
