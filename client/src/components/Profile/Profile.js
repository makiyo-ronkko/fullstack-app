import React, { useEffect, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserProfile, deleteAccount } from '../../actions/profile';
import './Profile.css';

const Profile = (props) => {
  // to getch profile data when as soon as page loaded

  const [showDelete, setShowDelete] = useState(false);

  const { profile } = props.profile;
  const { user } = props.auth;

  useEffect(() => {
    props.fetchUserProfile();
  }, [props.fetchUserProfile]);
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

  // display modal to double check account deletion
  const deleteConfirmation = () => {
    setShowDelete(!showDelete);
  };

  // confirm account deletion
  const confirmDelete = () => {
    props.deleteAccount();
  };

  if (!user) {
    return <Redirect to='/' />;
  }

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
          <Link to='/create-profile' className='Profile-Link'>
            Edit profile
          </Link>
          <button onClick={deleteConfirmation}>Delete Account</button>
        </div>
        {showDelete && (
          <div className='Modal-delete' style={{ display: 'block' }}>
            <span onClick={deleteConfirmation} className='close'>
              ×
            </span>
            <form className='Modal-content'>
              <div>
                <h1>This action will permanently delete your account</h1>
                <p>Are you sure you want to delete your account?</p>

                <div>
                  <button
                    type='submit'
                    onClick={deleteConfirmation}
                    className='cancelbtn'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    onClick={confirmDelete}
                    className='deletebtn'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  fetchUserProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { fetchUserProfile, deleteAccount })(
  Profile
);
