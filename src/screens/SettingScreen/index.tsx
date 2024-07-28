import { BackButton, ThemeModeButton } from '@/components/atoms';
import { Brand } from '@/components/molecules';
import { useTheme } from '@/theme';
import { View } from 'react-native';

const SettingScreen = () => {
	const { layout, gutters } = useTheme();
	return (
		<View style={[layout.flex_1, layout.itemsCenter, layout.justifyCenter]}>
			<BackButton />
			<Brand style={[gutters.marginBottom_80]} />
			<ThemeModeButton />
		</View>
	);
};

export default SettingScreen;
