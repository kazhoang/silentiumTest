import React, { useCallback } from 'react';
import {
	NavigationContainer,
	RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import { useTheme } from '@/theme';
import { RouteName } from '@/types/navigation';
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
	createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
	BottomTabBarProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@/components/atoms/AnimatedTabBar';
import { BestScreen, NewScreen, TopScreen } from '@/screens'; // Import DetailsScreen
import { HackerNewsStory } from '@/types/schemas/story';
import DetailsScreen from '@/screens/DetailScreen';
import SettingScreen from '@/screens/SettingScreen';

export type RootStackParamList = {
	[RouteName.Tabs]: undefined;
	[RouteName.Details]: {
		story: HackerNewsStory;
	};
	[RouteName.Setting]: undefined;
};

export type TabParamList = {
	[RouteName.New]: undefined;
	[RouteName.Best]: undefined;
	[RouteName.Top]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
	NativeStackScreenProps<TabParamList, T>;

export const useAppNavigation = () => {
	return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
};

export function useAppRouteParam<T extends keyof RootStackParamList>() {
	const route = useRoute<RouteProp<RootStackParamList, T>>();
	return route.params;
}

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	const renderTabBar = useCallback((props: BottomTabBarProps) => {
		return <AnimatedTabBar {...props} />;
	}, []);

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator
				initialRouteName={RouteName.Tabs} // Start with the tab bar
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name={RouteName.Tabs} options={{ headerShown: false }}>
					{() => (
						<Tab.Navigator
							key={variant}
							initialRouteName={RouteName.Best}
							screenOptions={{ headerShown: false }}
							tabBar={renderTabBar}
						>
							<Tab.Screen name={RouteName.New} component={NewScreen} />
							<Tab.Screen name={RouteName.Best} component={BestScreen} />
							<Tab.Screen name={RouteName.Top} component={TopScreen} />
						</Tab.Navigator>
					)}
				</Stack.Screen>
				<Stack.Screen name={RouteName.Details} component={DetailsScreen} />
				<Stack.Screen name={RouteName.Setting} component={SettingScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
