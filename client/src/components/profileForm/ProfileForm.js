import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import './ProfileForm.css';

const ProfileForm = (props) => {
  // passing createProfile and history

  const { user } = props.auth;

  const renderAuthenticatedUserInfo = () => {
    console.log(user);
    if (user !== null) return <h1>Welcome {user}!</h1>;
  };

  const [data, setData] = useState({
    intro: '',
    website: '',
    location: '',
  });

  const input = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    props.createProfile(data, props.history);
  };

  return (
    <div className='Profile-Form'>
      <div className='Profile-Form-title'>
        <Fragment>{renderAuthenticatedUserInfo}</Fragment>
      </div>
      <div className='container'>
        <form className='ProfileForm' onSubmit={submit}>
          <div className='Form-row'>
            <h1>Create Profile</h1>
          </div>

          <label htmlFor='intro'>Short introduction about yourself</label>
          <input
            type='textarea'
            placeholder="I'm a photographer"
            name='intro'
            onChange={input}
            value={data.intro}
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

          <div className='Form-row'>
            <button type='submit'>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(ProfileForm)
);
