import React from 'react';
import { TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

type CustomTextInputProps = TextInputProps & {
	customStyle?: ViewStyle | ViewStyle[];
	centerText?: boolean;
};
function CustomTextInput(props: CustomTextInputProps) {
	const { components, fonts, colors } = useTheme();
	const { customStyle, centerText, ...rest } = props;

	return (
		<View style={customStyle}>
			<TextInput
				autoCapitalize="none"
				autoFocus
				style={[components.textInput, centerText && fonts.alignCenter]}
				placeholderTextColor={colors.gray200}
				{...rest}
			/>
		</View>
	);
}

export default CustomTextInput;
