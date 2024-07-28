import { HackerNewsComment } from '@/types/schemas/story';
import { instance } from '../instance';

export default async (id: number): Promise<HackerNewsComment> => {
	const response: HackerNewsComment = await instance
		.get(`item/${id}.json`)
		.json();
	return response;
};
