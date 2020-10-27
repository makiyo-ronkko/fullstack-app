import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import PropTypes from 'prop-types';
import './PostForm.css';

const PostForm = (props) => {
  const [inputData, setInputData] = useState({
    image: null,
    caption: '',
    hashtag: '',
  });

  const inputHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const inputFileHandler = (e) => {
    setInputData({ image: e.target.files[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', inputData.caption);
    formData.append('hashtag', inputData.hashtag);
    formData.append('image', inputData.image);
    // props.addPost(inputData);
    props.addPost(formData);
    // Display the values
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    setInputData({ image: null, caption: '', hashtag: '' });
  };

  return (
    <div className='PostForm'>
      <h3>New Post</h3>
      <form onSubmit={submitHandler}>
        <input
          type='file'
          name='image'
          //   value={inputData.image}
          onChange={inputFileHandler}
          accept='.jpg, .png'
          required
        />
        <input
          type='text'
          name='caption'
          placeholder='caption'
          value={inputData.caption}
          onChange={inputHandler}
          required
        />
        <input
          type='text'
          name='hashtag'
          placeholder='#hashtag'
          value={inputData.hashtag}
          onChange={inputHandler}
          required
        />
        <div className='Form-btn'>
          <button type='submit'>Post</button>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
