import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, fetchUserProfile } from '../../actions/profile';
import './ProfileForm.css';

const ProfileForm = (props) => {
  const [data, setData] = useState({
    intro: '',
    website: '',
    location: '',
  });

  useEffect(() => {
    if (!props.profile) props.fetchUserProfile();
    if (!props.loading && props.profile) {
      setData({
        intro: !props.profile.intro ? '' : props.profile.intro,
        website: !props.profile.website ? '' : props.profile.website,
        location: !props.profile.location ? '' : props.profile.location,
      });
    }
  }, [props.loading, props.fetchUserProfile]);

  const input = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    props.createProfile(data, props.history, props.profile ? true : false);
  };

  return (
    <div className='Profile-Form'>
      <div className='container'>
        <form className='ProfileForm' onSubmit={submit}>
          <div className='Form-row'>
            <h1>Your Profile</h1>
          </div>

          <label htmlFor='intro'>Short introduction about yourself</label>
          <input
            type='textarea'
            placeholder="I'm a photographer"
            name='intro'
            onChange={input}
            value={props.intro}
          />
          <hr />

          <label htmlFor='website'>Your website:</label>
          <input
            type='url'
            placeholder='https://example.com'
            // pattern='https//.*'
            name='website'
            onChange={input}
            value={data.website}
          />
          <hr />

          <label htmlFor='location'>Where do you live?</label>
          <input
            type='text'
            placeholder='location'
            name='location'
            onChange={input}
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
