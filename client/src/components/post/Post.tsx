import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/post';
import PostDetail from './PostDetail';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { State } from '../../interfaces/state';
import { SinglePost } from '../../interfaces/singlePost';

interface PostProps {
	fetchPost: (val: string) => void;
	match: {
		params: {
			id: string;
		};
	};
	loading: boolean;
	post: SinglePost;
	postId: string;
}

const Post: FC<PostProps> = ({ fetchPost, match, loading, post, postId }) => {
	useEffect(() => {
		fetchPost(match.params.id);
		// eslint-disable-next-line
	}, [fetchPost]);

	return loading || post === null ? (
		<div>Loading...</div>
	) : (
		<div>
			<div className='PostItem-img'>
				{post.post && <PostDetail props={post.post} />}
			</div>
			<div className='comments'>
				{post.post && <CommentForm postId={post.post._id} />}
				{post.comments &&
					post.comments.map((comment: any) => (
						<CommentItem
							key={comment._id}
							comment={comment}
							postId={post.post._id}
						/>
					))}
			</div>
		</div>
	);
};

const mapStateToProps = (state: State) => ({
	post: state.post,
});

export default connect(mapStateToProps, { fetchPost })(Post);
