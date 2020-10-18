import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = (props) => {
  console.log(props);

  const submitHandler = () =>
    props.deleteComment(props.postId, props.comment._id);

  return (
    <div>
      <div>
        <Link to={`/profile/${props.comment.user}`}>
          <p>{props.comment.name}</p>
        </Link>
      </div>
      <div>
        <p>{props.comment.text}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD'>{props.comment.date}</Moment>
        </p>
        {!props.auth.loading && props.comment.user === props.auth.user._id && (
          <button onClick={submitHandler} type='button'>
            <i className='fas fa-times' />
          </button>
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
