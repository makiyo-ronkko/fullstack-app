import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post';
import './PostList.css';

const PostList = (props) => {
  useEffect(() => {
    props.fetchPosts();
  }, [props.fetchPosts, props.auth]);

  console.log(props);
  return !props.auth ? (
    <div>Loading...</div>
  ) : (
    <div className='PostList'>
      <h1>Daily Art Sharing</h1>
      <div className='PostList-cards'>
        {props.post.posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchPosts })(PostList);
