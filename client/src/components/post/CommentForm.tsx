import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import './CommentForm.css';

interface CommentFormProps {
	addComment: (val1: string, val2: any) => void;
	postId: string;
}

const CommentForm: FC<CommentFormProps> = ({
	addComment,
	postId,
}): JSX.Element => {
	const [text, setText] = useState('');

	const inputHandler = (e: any) => {
		setText(e.target.value);
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
		addComment(postId, { text });
		setText('');
	};

	return (
		<div className='CommentForm'>
			<form onSubmit={submitHandler}>
				<input
					name='text'
					type='text'
					placeholder='Leave a comment'
					value={text}
					onChange={inputHandler}
					required
				/>
				<div>
					{' '}
					<button type='submit'>
						<i className='fas fa-paper-plane'></i>
					</button>
				</div>
			</form>
		</div>
	);
};

export default connect(null, { addComment })(CommentForm);
