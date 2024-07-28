import { instance } from '@/services/instance';
import { StoryType } from '@/types/schemas/story';

export default async (type: StoryType): Promise<number[]> => {
	const response = await instance.get(`${type}stories.json`).json();
	return response as number[];
};
