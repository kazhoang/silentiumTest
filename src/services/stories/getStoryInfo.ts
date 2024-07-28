import { HackerNewsStory } from '@/types/schemas/story';
import { instance } from '../instance';

export default async (id: number): Promise<HackerNewsStory> => {
	const response: HackerNewsStory = await instance
		.get(`item/${id}.json`)
		.json();
	return response;
};
