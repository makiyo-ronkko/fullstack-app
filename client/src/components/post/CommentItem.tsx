import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import './CommentItem.css';
import { State } from '../../interfaces/state';
import { Comment } from '../../interfaces/comment';
import { Auth } from '../../interfaces/auth';

interface CommentItemProps {
	deleteComment: (val1: string, val2: string) => void;
	postId: string;
	comment: Comment;
	auth: Auth;
}

const CommentItem: FC<CommentItemProps> = ({
	deleteComment,
	postId,
	comment,
	auth,
}): JSX.Element => {
	const submitHandler = () => deleteComment(postId, comment._id);

	return (
		<div className='CommentItem'>
			<div className='CommentItem-profile'>
				<Link to={`/profile/${comment.user}`}>
					<p>{comment.name}</p>
				</Link>
			</div>
			<div className='CommentItem-comment'>
				<p>{comment.text}</p>
				<p className='CommentItem-date'>
					Posted on <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
				</p>
				{!auth.loading && comment.user === auth.user._id && (
					<div className='CommentItem-button'>
						<button onClick={submitHandler} type='button'>
							<i className='fas fa-times' />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state: State) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
