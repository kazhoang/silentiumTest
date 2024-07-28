import { useTheme } from '@/theme';
import { Text, TouchableOpacity, View } from 'react-native';
import Brand from '../Brand';
import { Fragment, PropsWithChildren } from 'react';
import SettingSvg from './SettingSvg';
import { useAppNavigation } from '@/navigators/Application';
import { RouteName } from '@/types/navigation';

const date = new Intl.DateTimeFormat('en-US', {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
}).format(new Date());

interface Props extends PropsWithChildren {
	title: string;
}

const StoryHeader = ({ children, title }: Props) => {
	const { gutters, layout, fonts } = useTheme();
	const navigation = useAppNavigation();
	return (
		<Fragment>
			<View
				style={[gutters.marginHorizontal_16, layout.row, layout.justifyBetween]}
			>
				<View>
					<Brand />
					<View style={[gutters.marginTop_24]}>
						<View>
							<Text style={[fonts.size_24, fonts.gray900, fonts.bold]}>
								{title}
							</Text>
							<Text
								style={[
									fonts.size_14,
									fonts.gray400,
									fonts.bold,
									gutters.marginTop_4,
								]}
							>
								{date}
							</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity
					style={[gutters.marginTop_4]}
					onPress={() => {
						navigation.navigate(RouteName.Setting);
					}}
				>
					<SettingSvg />
				</TouchableOpacity>
			</View>
			{children}
		</Fragment>
	);
};

export default StoryHeader;
