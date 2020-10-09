import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postLike, removeLike } from '../../actions/post';
import Moment from 'react-moment';
import './PostItem.css';

const PostItem = (props) => {
  const { name, user, image, caption, hashtag, date, likes, _id } = props.post;
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

  return (
    <div className='PostItem'>
      <div className='PostItem-user'>
        {props.auth && (
          <img src={props.auth.user.avatar} alt={props.auth.user.name} />
        )}
        <Link to={`/profile/${user}`}>
          <h4>{name}</h4>
        </Link>
      </div>
      <div className='PostItem-img'>
        <img src={image} alt={name} />
      </div>
      <div className='PostItem-content'>
        <div className='likes-btn'>
          <button onClick={() => props.postLike(_id)}>
            {' '}
            <i className='fas fa-plus' />{' '}
          </button>
          <button onClick={() => props.removeLike(_id)}>
            {' '}
            <i className='fas fa-minus' />{' '}
          </button>
        </div>
        <div className='likes' style={{ color: fasColor() }}>
          <i className={fasIcon()} style={{ fontSize: '1rem' }} />{' '}
          <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
        </div>
        <p>{caption}</p>
        <p className='hashtag'>{hashtag}</p>
        <p className='date'>
          Posted on &nbsp;<Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { postLike, removeLike })(PostItem);
