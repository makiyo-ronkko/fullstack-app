import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfileById } from '../../actions/profile';
import { fetchPosts } from '../../actions/post';
import PropTypes from 'prop-types';
import './ProfileView.css';

const ProfileView = (props) => {
  const { profile } = props.profile;
  const posts = props.post.posts;

  useEffect(() => {
    props.fetchProfileById(props.match.params.id);
    props.fetchPosts();
    window.scrollTo(0, 0);
  }, [props.fetchProfileById, props.fetchPosts, props.match.params.id]);

  console.log(props);
  console.log(posts);
  console.log(profile);

  return (
    <div className='container'>
      {profile !== null && (
        <div className='ProfileView-container'>
          <div className='Form-btn'>
            <Link to='/gallery' className='Profile-FormLink'>
              <i className='fas fa-arrow-alt-circle-left'></i>
            </Link>
          </div>
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
          <div className='ProfileView-posts'>
            {posts &&
              posts
                .filter((post) => post.user === profile.appuser._id)
                .map((post) => (
                  <div key={post.id} className='ProfileView-post-container'>
                    <Link to={`/gallery/${post._id}`}>
                      <img
                        src={`data:image/png;base64,${post.image}`}
                        alt={post.name}
                        className='ProfileView-img'
                      />
                    </Link>
                    <p>{post.caption}</p>
                  </div>
                ))}
          </div>
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
