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
    if (e.target.name === 'name') {
      setData({ ...data, image: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('hashtag', data.hashtag);
    formData.append('image', data.image);
    // props.addPost(data);
    props.addPost(formData);
    console.log(formData);
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
          onChange={inputHandler}
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
