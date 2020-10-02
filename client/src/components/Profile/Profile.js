import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions/profile';
import './Profile.css';

const Profile = (props) => {
  // to getch profile data when as soon as page loaded

  const { profile } = props.profile;
  const { user } = props.auth;

  useEffect(() => {
    props.fetchUserProfile();
  }, []);
  console.log(profile);

  const renderAuthenticatedUserInfo = () => {
    console.log(user);
    if (user !== null) {
      return (
        <>
          <img src={user.avatar} alt={user.name} />
          <p>Name: {user.name}</p>
          <hr />
          <p>Email: {user.email}</p>
          <hr />
        </>
      );
    }
  };

  return props.loading && props.profile === null ? (
    <Fragment>Loading... </Fragment>
  ) : (
    <Fragment>
      <div className='container'>
        <div className='Profile'>
          <h1>Account Information</h1>
          <div>{renderAuthenticatedUserInfo()}</div>
          {profile !== null ? (
            <Fragment>
              <h1>Profile</h1>
              <div>
                <p>Bio: {profile.intro}</p>
                <hr />
                <p>Location: {profile.location}</p>
                <hr />
                <p>
                  Website: <a href={profile.website}>{profile.website}</a>
                </p>
                <hr />
              </div>
            </Fragment>
          ) : (
            <Fragment>Loading... </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  fetchUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { fetchUserProfile })(Profile);
