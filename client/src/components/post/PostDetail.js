import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import './PostDetail.css';
import CommentItem from './CommentItem';

const PostDetail = (props) => {
  const {
    name,
    user,
    image,
    caption,
    hashtag,
    date,
    likes,
    comments,
    _id,
  } = props.post.post;

  // const [showImg, setShowImg] = useState(false);

  console.log(props);

  const fasColor = () => {
    if (likes.length >= 5) {
      return '#ff6600';
    } else if (likes.length >= 2) {
      return '#ffcc00';
    } else {
      return '#6666ff';
    }
  };

  const fasIcon = () => {
    if (likes.length >= 5) {
      return 'fas fa-crown';
    } else if (likes.length >= 2) {
      return 'fas fa-star';
    } else {
      return 'fas fa-grin-stars';
    }
  };

  // open img modal
  // const openImgModal = () => {
  //   setShowImg(!showImg);
  // };

  return (
    <div className='PostDetail'>
      <div className='Form-btn'>
        <Link to='/gallery' className='Gallery-FormLink'>
          <i className='fas fa-arrow-alt-circle-left'></i>
        </Link>
      </div>
      <div className='PostDetail-header'>
        <div className='PostDetail-user'>
          {props.auth.user && (
            <img src={props.auth.user.avatar} alt={props.auth.user.name} />
          )}
          <Link to={`/profile/${user}`}>
            <h4>{name}</h4>
          </Link>
        </div>
      </div>
      <div className='PostDetail-img'>
        <img
          // onClick={openImgModal}
          //   src={image}
          src={`data:image/png;base64,${image}`}
          alt={name}
        />
      </div>
      <div className='PostDetail-content'>
        <div className='likes' style={{ color: fasColor() }}>
          <i className={fasIcon()} style={{ fontSize: '1rem' }} />{' '}
          {likes && (
            <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
          )}
        </div>
        <p>{caption}</p>
        <p className='hashtag'>{hashtag}</p>
        <p className='date'>
          Posted on &nbsp;
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {comments && (
          <div>
            {' '}
            {props.auth.user &&
              comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={_id} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps)(PostDetail);
