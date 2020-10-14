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
  const input = (e) => {
    if (e.target.name === 'name') {
      setData({ ...data, image: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const submit = (e) => {
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
      <form onSubmit={submit}>
        <input
          type='file'
          name='image'
          //   value={data.image}
          onChange={input}
          accept='.jpg, .png'
        />
        <input
          type='text'
          name='caption'
          placeholder='caption'
          value={data.caption}
          onChange={input}
        />
        <input
          type='text'
          name='hashtag'
          placeholder='#hashtag'
          value={data.hashtag}
          onChange={input}
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
