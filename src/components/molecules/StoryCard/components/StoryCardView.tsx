import { useAppNavigation } from '@/navigators/Application';
import { useTheme } from '@/theme';
import { RouteName } from '@/types/navigation';
import { HackerNewsStory, StoryCardType } from '@/types/schemas/story';
import { ago } from '@/utils/ago';
import { getApplicationName, pluralize } from '@/utils/helpers';
import { Linking, Text, TouchableWithoutFeedback, View } from 'react-native';

interface Props {
	story: HackerNewsStory;
	type?: StoryCardType;
	disableCommentPress?: boolean;
}

const StoryCardView = ({
	story,
	type = 'default',
	disableCommentPress = false,
}: Props) => {
	const { layout, gutters, fonts } = useTheme();
	const navigation = useAppNavigation();

	const isRecommend = type === 'recommend';
	const isFeature = type === 'feature';

	return (
		<View
			testID={`story-card-${story.id}`}
			style={[
				gutters.padding_16,
				isRecommend ? layout.halfWidth : layout.fullWidth,
			]}
		>
			<TouchableWithoutFeedback
				onPress={() => {
					Linking.openURL(story.url);
				}}
			>
				<Text
					style={[
						gutters.marginTop_4,
						fonts.gray800,
						fonts.bold,
						fonts.size_24,
						isRecommend && [fonts.size_16, fonts.lineHeight24],
						isFeature && [fonts.size_48, { letterSpacing: 2 }],
					]}
					numberOfLines={5}
				>
					{story.title}
				</Text>
			</TouchableWithoutFeedback>
			<Text
				style={[fonts.gray800, fonts.size_14, gutters.marginTop_12]}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{story.url ? getApplicationName(story.url) : ''}
			</Text>
			<View>
				<View
					style={[
						layout.fullWidth,
						layout.row,
						layout.justifyBetween,
						gutters.marginTop_12,
					]}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							Linking.openURL(
								`https://news.ycombinator.com/user?id=${story.by}`,
							);
						}}
					>
						<Text style={[fonts.gray400, fonts.size_14]}>@{story.by}</Text>
					</TouchableWithoutFeedback>
					<Text style={[fonts.gray400, fonts.size_14]}>
						{ago.format(new Date(story.time * 1000), 'mini')}
					</Text>
				</View>
				<Text
					style={[
						fonts.bold,
						fonts.gray200,
						fonts.size_16,
						gutters.marginTop_12,
						isRecommend && fonts.size_12,
					]}
				>
					<Text style={[fonts.primary, fonts.bold]}>⇧{story.score}</Text> &bull;{' '}
					<TouchableWithoutFeedback
						testID="comment-button"
						disabled={disableCommentPress || !story.descendants}
						onPress={() => {
							navigation.navigate(RouteName.Details, { story });
						}}
					>
						<Text style={[fonts.gray200, fonts.normal]}>
							{pluralize(story.descendants, 'comment')}
						</Text>
					</TouchableWithoutFeedback>
				</Text>
			</View>
		</View>
	);
};

export default StoryCardView;
