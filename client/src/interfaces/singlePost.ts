import { PostInterface } from './post';

export interface SinglePost {
	error: { msg: string; status: number };
	loading: boolean;
	post: PostInterface;
	posts?: PostInterface[];
	comments?: string[];
}
