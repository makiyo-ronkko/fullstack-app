import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/post';
import PostDetail from './PostDetail';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Post = (props) => {
  useEffect(() => {
    props.fetchPost(props.match.params.id);
  }, [props.fetchPost]);

  console.log(props);

  return props.loading || props.post === null ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className='PostItem-img'>
        {props.post.post && <PostDetail props={props.post.post} />}
      </div>
      <div className='comments'>
        {props.post.post && <CommentForm postId={props.post.post._id} />}
        {props.post.comments &&
          props.post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={props.post.post._id}
            />
          ))}
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
