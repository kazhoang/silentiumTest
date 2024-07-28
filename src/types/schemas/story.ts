export type HackerNewsItem = HackerNewsStory | HackerNewsComment;

export type HackerNewsItemBase = {
	id: number;
	by: string;
	descendants: number;
	kids?: number[];
	score: number;
	time: number;
	title: string;
	text: string;
	parent: number;
	url: string;
	deleted: boolean;
	dead: boolean;
};

export type HackerNewsStory = Pick<
	HackerNewsItemBase,
	| 'by'
	| 'descendants'
	| 'id'
	| 'kids'
	| 'score'
	| 'time'
	| 'title'
	| 'url'
	| 'deleted'
	| 'dead'
> & {
	type: 'story';
};

export type HackerNewsComment = Pick<
	HackerNewsItemBase,
	'by' | 'id' | 'kids' | 'parent' | 'time' | 'text' | 'deleted' | 'dead'
> & {
	type: 'comment';
};

export enum StoryType {
	TOP = 'top',
	NEW = 'new',
	BEST = 'best',
}

export type StoryCardType = 'feature' | 'recommend' | 'default';
