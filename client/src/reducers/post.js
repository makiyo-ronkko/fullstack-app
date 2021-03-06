import {
	FETCH_POSTS,
	POST_FAIL,
	POST_LIKE,
	DELETE_POST,
	FETCH_POST,
	ADD_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
} from '../actions/types';

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};

		case FETCH_POST:
			return {
				...state,
				post: action.payload,
				loading: false,
			};

		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			};

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
				loading: false,
			};
		case POST_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case POST_LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.id
						? { ...post, likes: action.payload.likes }
						: post
				),
				loading: false,
			};
		case ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: action.payload },
				loading: false,
			};
		case DELETE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter(
						(comment) => comment._id !== action.payload
					),
				},
				loading: false,
			};
		default:
			return state;
	}
}
