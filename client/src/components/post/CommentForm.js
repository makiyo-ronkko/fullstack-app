import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = (props) => {
  const [text, settext] = useState('');
  console.log(props);

  const inputHandler = (e) => {
    settext(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.addComment(props.postId, { text });
    settext('');
    console.log({ text });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          name='text'
          type='text'
          placeholder='Leave a comment'
          value={text}
          onChange={inputHandler}
          required
        />
        <div className='Form-row'>
          {' '}
          <button type='submit'>Comment</button>
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
