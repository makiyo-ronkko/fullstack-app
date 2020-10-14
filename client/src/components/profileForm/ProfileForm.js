import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, fetchUserProfile } from '../../actions/profile';
import './ProfileForm.css';

const ProfileForm = (props) => {
  const { profile, loading } = props.profile;

  const [data, setData] = useState({
    intro: '',
    website: '',
    location: '',
  });

  useEffect(() => {
    if (!profile) props.fetchUserProfile();
    if (!loading && profile) {
      setData({
        intro: !profile.intro ? '' : profile.intro,
        website: !profile.website ? '' : profile.website,
        location: !profile.location ? '' : profile.location,
      });
    }
  }, [profile, loading, props.fetchUserProfile]);

  console.log(props);

  const inputHandler = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const submitHandler = (e) => {
    e.preventDefault();
    props.createProfile(data, props.history, profile ? true : false);
  };

  return (
    <div className='Profile-Form'>
      <div className='container'>
        <form className='ProfileForm' onSubmit={submitHandler}>
          <div className='Form-row'>
            <h1>Your Profile</h1>
          </div>

          <label htmlFor='intro'>Short introduction about yourself</label>
          <input
            type='textarea'
            placeholder="I'm a photographer"
            name='intro'
            onChange={inputHandler}
            value={data.intro}
          />
          <hr />

          <label htmlFor='website'>Your website:</label>
          <input
            type='url'
            placeholder='https://example.com'
            // pattern='https//.*'
            name='website'
            onChange={inputHandler}
            value={data.website}
          />
          <hr />

          <label htmlFor='location'>Where do you live?</label>
          <input
            type='text'
            placeholder='location'
            name='location'
            onChange={inputHandler}
            value={data.location}
          />
          <hr />

          <div className='Form-btn'>
            <button type='submit'>Save</button>
          </div>
          <div className='Form-btn'>
            <Link to='/profile' className='Profile-FormLink'>
              <i className='fas fa-arrow-alt-circle-left'></i>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, fetchUserProfile })(
  withRouter(ProfileForm)
);
