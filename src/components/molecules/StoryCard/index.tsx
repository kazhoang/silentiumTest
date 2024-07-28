import getStoryInfo from '@/services/stories/getStoryInfo';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import SkeletonPlaceHolder from './components/SkeletonPlaceHolder';
import { StoryCardType } from '@/types/schemas/story';
import StoryCardView from './components/StoryCardView';

export const StoryCard = ({
	type = 'default',
	id,
}: {
	type?: StoryCardType;
	id: number;
}) => {
	// const { story } = useStoryCard(id);
	const { data: story } = useQuery({
		queryKey: ['story', id],
		queryFn: () => getStoryInfo(id),
		enabled: id !== -1,
	});

	if (!story) {
		return <SkeletonPlaceHolder isHalfWidth={type === 'recommend'} />;
	}

	if (story.deleted || story.dead) {
		return null;
	}

	return <StoryCardView story={story} type={type} />;
};

export default memo(StoryCard);
