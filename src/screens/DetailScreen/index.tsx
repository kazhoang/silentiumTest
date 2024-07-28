import React, { useCallback } from 'react';

import { useAppRouteParam } from '@/navigators/Application';
import { useTheme } from '@/theme';

import { RouteName } from '@/types/navigation';
import { BackButton } from '@/components/atoms';
import { SafeScreen } from '@/components/template';
import StoryCardView from '@/components/molecules/StoryCard/components/StoryCardView';
import PagingListView from '@/components/atoms/PagingListView';
import Comment from '@/components/molecules/Comment';

const DetailsScreen = () => {
	const { layout, gutters } = useTheme();
	const route = useAppRouteParam<RouteName.Details>();

	const story = route?.story;

	if (!story) {
		return null;
	}
	if (!story.kids?.length) {
		return null;
	}

	const renderHeader = useCallback(() => {
		return <StoryCardView story={story} disableCommentPress />;
	}, []);

	const keyExtractor = useCallback((item: number) => item.toString(), []);

	const renderItem = useCallback(
		({ item, index }: { item: number; index: number }) => (
			<Comment key={item === -1 ? index : item} id={item} />
		),
		[],
	);

	return (
		<SafeScreen isTopEdge={true}>
			<BackButton />
			<PagingListView<number>
				ListHeaderComponent={renderHeader}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				data={story.kids}
				style={layout.flex_1}
				contentContainerStyle={gutters.marginTop_48}
			/>
		</SafeScreen>
	);
};

export default DetailsScreen;
