import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import './CommentItem.css';

const CommentItem = (props) => {
  const submitHandler = () =>
    props.deleteComment(props.postId, props.comment._id);

  return (
    <div className='CommentItem'>
      <div className='CommentItem-profile'>
        <Link to={`/profile/${props.comment.user}`}>
          <p>{props.comment.name}</p>
        </Link>
      </div>
      <div className='CommentItem-comment'>
        <p>{props.comment.text}</p>
        <p className='CommentItem-date'>
          Posted on <Moment format='YYYY/MM/DD'>{props.comment.date}</Moment>
        </p>
        {!props.auth.loading && props.comment.user === props.auth.user._id && (
          <div className='CommentItem-button'>
            <button onClick={submitHandler} type='button'>
              <i className='fas fa-times' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
