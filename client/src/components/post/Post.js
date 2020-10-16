import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/post';
import PostDetail from './PostDetail';

const Post = (props) => {
  useEffect(() => {
    props.fetchPost(props.match.params.id);
  }, [props.fetchPost, props.loading]);

  console.log(props);

  return props.loading || props.post === null ? (
    <div>Loading...</div>
  ) : (
    <div>
      {/* <PostDetail post={props.post} /> */}
      <div className='PostItem-img'>
        {props.post.post && <PostDetail props={props.post.post} />}
      </div>
    </div>
  );
};

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { fetchPost })(Post);
