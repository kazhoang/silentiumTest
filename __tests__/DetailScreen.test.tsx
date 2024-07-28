import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/theme';
import { MMKV } from 'react-native-mmkv';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from '@/screens/DetailScreen';
import { getStories, getStoryInfo } from '@/services/stories';
import { StoryType } from '@/types/schemas/story';
import { useAppRouteParam } from '@/navigators/Application';
import { getApplicationName } from '@/utils/helpers';

// Mock useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: () => ({ top: 20, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@/components/template/SafeScreen/SafeScreen.tsx', () =>
	require(`./mock/SafeScreen`),
);

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

describe('DetailsScreen', () => {
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
						<DetailsScreen />
					</NavigationContainer>
				</ThemeProvider>
			</QueryClientProvider>,
		);
	};

	it('should render the story details correctly', async () => {
		const storiesData = await getStories(StoryType.BEST);
		const randomStory =
			storiesData[Math.floor(Math.random() * storiesData.length)];
		const storyData = await getStoryInfo(randomStory);

		(useAppRouteParam as jest.Mock).mockReturnValue({ story: storyData });

		renderScreen();
		await waitFor(() => {
			expect(screen.getByText(storyData.title)).toBeVisible();
		});

		await waitFor(() => {
			expect(
				screen.getByText(
					storyData.url ? getApplicationName(storyData.url) : '',
				),
			).toBeVisible();
		});
	});
});
