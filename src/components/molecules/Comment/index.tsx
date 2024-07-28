import { useQuery } from '@tanstack/react-query';
import { Fragment, memo, useMemo, useState } from 'react';
import getCommentInfo from '@/services/comments/getCommentInfo';
import CommentSkeleton from './components/SkeletonPlaceHolder';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import { useTheme } from '@/theme';
import { moderateScale } from '@/types/theme/responsive';
import { ago } from '@/utils/ago';
import ContentHtml from '../ContentHTML';
import { pluralize } from '@/utils/helpers';

export const Comment = ({ id, depth = 1 }: { id: number; depth?: number }) => {
	const { layout, gutters, fonts, colors } = useTheme();
	const [isShowReply, setIsShowReply] = useState(false);
	const { data: comment } = useQuery({
		queryKey: ['comment', id],
		queryFn: () => getCommentInfo(id),
	});

	const depthStyle: ViewStyle = useMemo(
		() =>
			depth > 1
				? {
						borderLeftWidth: 2,
						borderLeftColor: colors.primary,
						marginLeft: (depth - 1) * moderateScale(8), // Calculate marginLeft correctly
				  }
				: {},
		[depth],
	);
	if (!comment) {
		return <CommentSkeleton />;
	}

	if (comment.deleted || comment.dead) {
		return null;
	}

	return (
		<Fragment>
			<View
				style={[
					gutters.padding_16,

					{
						borderTopWidth: StyleSheet.hairlineWidth,
						borderColor: colors.gray800,
						...depthStyle,
					},
				]}
			>
				<View
					style={[
						layout.fullWidth,
						layout.row,
						layout.justifyBetween,
						gutters.marginBottom_12,
					]}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							// navigation.navigate(RouteName.User, { userId: comment.by });
						}}
					>
						<Text style={[fonts.gray400, fonts.size_14]}>@{comment.by}</Text>
					</TouchableWithoutFeedback>
					<Text style={[fonts.gray400, fonts.size_14]}>
						{ago.format(new Date(comment.time * 1000), 'mini')}
					</Text>
				</View>
				<ContentHtml html={comment.text} />
				<TouchableWithoutFeedback
					disabled={!comment.kids?.length}
					onPress={() => {
						setIsShowReply(!isShowReply);
					}}
				>
					<Text
						style={[
							fonts.light,
							fonts.gray400,
							fonts.size_12,
							gutters.marginTop_8,
						]}
					>
						{pluralize(comment.kids?.length ?? 0, 'reply', 'replies')}
					</Text>
				</TouchableWithoutFeedback>
			</View>
			{isShowReply && (
				<FlatList
					data={comment.kids}
					renderItem={({ item }) => <Comment id={item} depth={depth + 1} />}
				/>
			)}
		</Fragment>
	);
};

export default memo(Comment);
