import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/theme';
import { useQuery } from '@tanstack/react-query';
import getStories from '@/services/stories/getStories';
import { StoryType } from '@/types/schemas/story';
import StoryCard from '@/components/molecules/StoryCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PagingListView from '@/components/atoms/PagingListView';
import StoryHeader from '@/components/molecules/StoryHeader';
import { capitalize } from '@/utils/helpers';

export const StoriesScreen = ({ storyType }: { storyType: StoryType }) => {
	const { layout, components, gutters } = useTheme();
	const { top } = useSafeAreaInsets();

	const { data } = useQuery({
		queryKey: ['stories', storyType],
		queryFn: () => getStories(storyType),
	});

	const featureStory = useMemo(() => data?.[0] || -1, [data]);
	const recommendStories = useMemo(
		() => data?.slice(1, 5) || Array.from<number>({ length: 4 }).fill(-1),
		[data],
	);
	const commonStories = useMemo(() => data?.slice(6) || [], [data]);

	const renderHeader = useCallback(
		() => (
			<StoryHeader title={`${capitalize(storyType)} Story`}>
				<View style={components.divider} />
				<StoryCard id={featureStory} type="feature" />
				<View style={[layout.row, layout.wrap, gutters.marginTop_24]}>
					{recommendStories.map((item, index) => (
						<StoryCard
							key={item === -1 ? index : item}
							id={item}
							type="recommend"
						/>
					))}
				</View>
				<View style={[components.divider, gutters.marginHorizontal_16]} />
			</StoryHeader>
		),
		[featureStory, recommendStories],
	);

	const keyExtractor = useCallback((item: number) => item.toString(), []);

	const renderItem = useCallback(
		({ item, index }: { item: number; index: number }) => (
			<StoryCard key={item === -1 ? index : item} id={item} />
		),
		[],
	);

	const renderSeparator = useCallback(
		() => <View style={[components.divider, gutters.marginHorizontal_16]} />,
		[],
	);

	return (
		<PagingListView<number>
			contentContainerStyle={{ paddingTop: top }}
			ListHeaderComponent={renderHeader}
			data={commonStories}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			ItemSeparatorComponent={renderSeparator}
		/>
	);
};

export const NewScreen = () => <StoriesScreen storyType={StoryType.NEW} />;
export const BestScreen = () => <StoriesScreen storyType={StoryType.BEST} />;
export const TopScreen = () => <StoriesScreen storyType={StoryType.TOP} />;
