import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfileById } from '../../actions/profile';
import { fetchPosts } from '../../actions/post';
import PropTypes from 'prop-types';
import './Profile.css';

const ProfileView = (props) => {
  const { profile } = props.profile;
  const { name, user, image, caption, hashtag, date, likes, _id } = props.post;

  const posts = props.post.posts;

  useEffect(() => {
    props.fetchProfileById(props.match.params.id);
    props.fetchPosts();
    window.scrollTo(0, 0);
  }, [props.fetchProfileById, props.fetchPosts, props.match.params.id]);

  console.log(props);
  console.log(posts);
  return (
    <div className='container'>
      {profile !== null && (
        <div className='Profile'>
          <h1>Profile</h1>
          <div>
            {profile.appuser.avatar && (
              <img src={profile.appuser.avatar} alt={profile.appuser.name} />
            )}
            {profile.appuser.name && <p>Name: {profile.appuser.name}</p>}
            <hr />
            {profile.intro && <p>Bio: {profile.intro}</p>}
            <hr />
            {profile.location && <p>Location: {profile.location}</p>}
            <hr />
            {profile.website && (
              <p>
                Website:{' '}
                <a href={profile.website} target='_blank'>
                  {profile.website}
                </a>
              </p>
            )}
            <hr />
          </div>
          <div className='Form-btn'>
            <Link to='/gallery' className='Profile-FormLink'>
              <i className='fas fa-arrow-alt-circle-left'></i>
            </Link>
          </div>
          {/* {profile.appuser._id && */}
          {/* {profile.appuser._id === user && */}
          {posts.map((post) => (
            <div key={post.id}>
              <img src={post.image} alt={post.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ProfileView.propTypes = {
  fetchProfileById: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { fetchProfileById, fetchPosts })(
  ProfileView
);
