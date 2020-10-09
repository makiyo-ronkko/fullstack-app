import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import './PostItem.css';

const PostItem = (props) => {
  const { name, image, caption, hashtag, date } = props.post;
  console.log(props);

  return (
    <div className='PostItem'>
      <div className='PostItem-user'>
        {props.auth && <img src={props.auth.user.avatar} />}
        <Link to={`/profile/${props.user}`}>
          <h4>{name}</h4>
        </Link>
      </div>
      <div className='PostItem-text'>
        <img src={image} />
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
