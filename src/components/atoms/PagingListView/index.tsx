import { useTheme } from '@/theme';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Text,
	ActivityIndicator,
	ListRenderItem,
	FlatListProps,
} from 'react-native';

interface PagingListViewProps<T>
	extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
	data: T[];
	limitPerPage?: number;
	renderItem: ListRenderItem<T>;
}

const LIMIT_PER_PAGE: number = 8;

const PagingListView = <T,>({
	data,
	limitPerPage = LIMIT_PER_PAGE,
	renderItem,
	...flatListProps
}: PagingListViewProps<T>) => {
	const { fonts, layout, gutters } = useTheme();

	const [currentData, setCurrentData] = useState<T[]>([]);
	const [showLoading, setShowLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [loadMore, setLoadMore] = useState(true);

	const fetchData = () => {
		const startIndex = (currentPage - 1) * limitPerPage;
		const endIndex = startIndex + limitPerPage;
		const newData = data.slice(startIndex, endIndex);
		console.log('CurrentPaging', startIndex, endIndex);
		setCurrentData(prevData => [...prevData, ...newData]);
		setCurrentPage(prevPage => prevPage + 1);

		if (newData.length < limitPerPage || endIndex >= data.length) {
			setLoadMore(false);
		}
	};

	useEffect(() => {
		if (data.length > 0 && currentData.length === 0) {
			fetchData();
		}
	}, [data]);

	useEffect(() => {
		if (showLoading && loadMore) {
			fetchData();
			setShowLoading(false);
		}
	}, [showLoading, loadMore]);

	const onEndReached = () => {
		if (loadMore) {
			setShowLoading(true);
		}
	};

	const ListFooterComponent = () =>
		loadMore ? (
			<ActivityIndicator style={{ marginVertical: 5 }} size="small" />
		) : (
			<Text
				style={[
					fonts.gray200,
					layout.selfCenter,
					gutters.marginVertical_4,
					fonts.size_10,
				]}
			>
				-- End of list --
			</Text>
		);

	return (
		<FlatList
			data={currentData}
			renderItem={renderItem}
			{...flatListProps}
			showsVerticalScrollIndicator={false}
			initialNumToRender={limitPerPage}
			onEndReached={onEndReached}
			ListFooterComponent={ListFooterComponent}
		/>
	);
};

export default PagingListView;
