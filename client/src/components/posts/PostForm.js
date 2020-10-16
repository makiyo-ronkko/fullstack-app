import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import PropTypes from 'prop-types';
import './PostForm.css';

const PostForm = (props) => {
  const [data, setData] = useState({
    image: null,
    caption: '',
    hashtag: '',
  });

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const inputFileHandler = (e) => {
    setData({ image: e.target.files[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('hashtag', data.hashtag);
    formData.append('image', data.image);
    // props.addPost(data);
    props.addPost(formData);
    // Display the values
    for (var value of formData.values()) {
      console.log(value);
    }
    console.log(data.image);
    setData('');
  };

  return (
    <div className='PostForm'>
      <h3>New Post</h3>
      <form onSubmit={submitHandler}>
        <input
          type='file'
          name='image'
          //   value={data.image}
          onChange={inputFileHandler}
          accept='.jpg, .png'
        />
        <input
          type='text'
          name='caption'
          placeholder='caption'
          value={data.caption}
          onChange={inputHandler}
        />
        <input
          type='text'
          name='hashtag'
          placeholder='#hashtag'
          value={data.hashtag}
          onChange={inputHandler}
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
