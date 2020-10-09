import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import './PostItem.css';

const PostItem = (props) => {
  const { name, image, caption, hashtag, date, likes } = props.post;
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
        <Link to={`/profile/${props.user}`}>
          <h4>{name}</h4>
        </Link>
      </div>
      <div className='PostItem-text'>
        <img src={image} alt={name} />
        <p>{caption}</p>
        <p className='hashtag'>{hashtag}</p>
        <p className='date'>
          Posted on &nbsp;<Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
      </div>
      <div className='likes' style={{ color: fasColor() }}>
        <i className={fasIcon()} />{' '}
        <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
