import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import getStories from '@/services/stories/getStories';
import {
	HackerNewsStory,
	StoryCardType,
	StoryType,
} from '@/types/schemas/story';
import { MMKV } from 'react-native-mmkv';
import { StoriesScreen } from '../src/screens/StoriesScreen';
import { getStoryInfo } from '@/services/stories';
import StoryCardView from '@/components/molecules/StoryCard/components/StoryCardView';
import { NavigationContainer } from '@react-navigation/native';
import { capitalize } from '@/utils/helpers';

// Mock useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: () => ({ top: 20, bottom: 0, left: 0, right: 0 }),
}));

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

jest.useFakeTimers();

describe('StoriesScreen', () => {
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

	const renderScreen = (storyType: StoryType) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<ThemeProvider storage={storage}>
					<StoriesScreen storyType={storyType} />
				</ThemeProvider>
			</QueryClientProvider>,
		);
	};

	const renderStoryView = (story: HackerNewsStory, type: StoryCardType) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<ThemeProvider storage={storage}>
					<NavigationContainer>
						<StoryCardView story={story} type={type} />
					</NavigationContainer>
				</ThemeProvider>
			</QueryClientProvider>,
		);
	};

	const checkSingleStory = async (storyId: number, type: StoryCardType) => {
		const storyData = await getStoryInfo(storyId);
		console.log('storyData:', storyData);
		const { queryByTestId } = renderStoryView(storyData, type);
		const recommendStoryCard = queryByTestId(`story-card-${storyId}`);
		expect(recommendStoryCard).toBeTruthy();
	};

	const checkLoadingScreenState = async (storyType: StoryType) => {
		const { queryAllByTestId } = renderScreen(storyType);

		await waitFor(() => {
			expect(screen.getByText(`${capitalize(storyType)} Story`)).toBeTruthy();
		});

		await waitFor(() => {
			const skeletonStoryCards = queryAllByTestId('skeleton-story-card');
			expect(skeletonStoryCards).toHaveLength(5);
		});
	};

	const checkHasDataScreenState = async (storyType: StoryType) => {
		const storiesData = await getStories(storyType);
		await waitFor(() => {
			console.log('newStoriesData:', storiesData);
			expect(storiesData).toBeTruthy();
		});

		const featureStory = storiesData[0];
		await checkSingleStory(featureStory, 'feature');

		const recommendStories = storiesData.slice(1, 5);
		await Promise.all(
			recommendStories.map(async recommend => {
				await checkSingleStory(recommend, 'recommend');
			}),
		);
		const commonStories = storiesData.slice(6, 14);
		await Promise.all(
			commonStories.map(async common => {
				await checkSingleStory(common, 'default');
			}),
		);
	};

	// New Stories
	it('New stories: renders correctly handles loading state', async () => {
		checkLoadingScreenState(StoryType.NEW);
	});

	it('New stories: renders correctly with data', async () => {
		await checkHasDataScreenState(StoryType.NEW);
	});

	// Best Stories
	it('Best stories: renders correctly handles loading state', async () => {
		checkLoadingScreenState(StoryType.BEST);
	});

	it('Best stories: renders correctly with data', async () => {
		await checkHasDataScreenState(StoryType.BEST);
	});

	// Top Stories
	it('Top stories: renders correctly handles loading state', async () => {
		checkLoadingScreenState(StoryType.TOP);
	});

	it('Top stories: renders correctly with data', async () => {
		await checkHasDataScreenState(StoryType.NEW);
	});
});
