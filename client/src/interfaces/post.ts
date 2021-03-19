export interface PostInterface {
	user: string;
	name: string;
	avatar: string;
	image: HTMLImageElement;
	caption: string;
	hashtag: string;
	likes: number[];
	comments: string[];
	_id: number;
	id: number;
}
