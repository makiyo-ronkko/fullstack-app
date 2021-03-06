import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import './CommentForm.css';

const CommentForm = (props) => {
	const [text, setText] = useState('');

	const inputHandler = (e) => {
		setText(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		props.addComment(props.postId, { text });
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

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
