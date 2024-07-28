import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/theme';
import { MMKV } from 'react-native-mmkv';
import { NavigationContainer } from '@react-navigation/native';
import SettingScreen from '@/screens/SettingScreen';

jest.useFakeTimers();

// Mock navigation
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: () => ({
			navigate: mockedNavigate,
		}),
	};
});

jest.mock('@/navigators/Application', () => ({
	useAppRouteParam: jest.fn(),
	useAppNavigation: jest.fn(),
}));

describe('SettingScreen', () => {
	let storage: MMKV;
	let queryClient: QueryClient;

	beforeAll(() => {
		storage = new MMKV();
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
				mutations: {},
			},
		});
	});

	const renderScreen = () => {
		return render(
			<QueryClientProvider client={queryClient}>
				<ThemeProvider storage={storage}>
					<NavigationContainer>
						<SettingScreen />
					</NavigationContainer>
				</ThemeProvider>
			</QueryClientProvider>,
		);
	};

	it('SettingScreen: should render correctly and theme button work correctly', async () => {
		expect(storage.getString('dark'));

		const { getByTestId } = renderScreen();
		const themeButton = getByTestId('theme-mode-button');
		expect(themeButton).toBeTruthy();

		fireEvent.press(themeButton);
		expect(storage.getString('theme')).toBe('default');

		fireEvent.press(themeButton);
		expect(storage.getString('theme')).toBe('dark');
	});
});
