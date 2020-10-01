import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AccountForm.css';

const AccountForm = () => {
  const [data, setData] = useState({
    intro: '',
    website: '',
    location: '',
  });

  const input = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div>
      <div className='container'>
        <div className='AccountForm-title'>
          <h1>Welcome "user" and "username"!</h1>
        </div>
        <form className='AccountForm'>
          <div className='Form-row'>
            <h1>Create Profile</h1>
          </div>

          <label for='intro'>Short introduction about yourself</label>
          <input
            type='textarea'
            placeholder='About yourself'
            name='intro'
            onChange={input}
            value={data.intro}
          />
          <hr />

          <label for='website'>Your website:</label>
          <input
            type='url'
            placeholder='https://example.com'
            pattern='https//.*'
            name='website'
            onChange={input}
            value={data.website}
          />
          <hr />

          <label for='location'>Where do you live?</label>
          <input
            type='text'
            placeholder='location'
            name='location'
            onChange={input}
            value={data.location}
          />

          <div className='Form-row'>
            <button type='submit'>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

AccountForm.propTypes = {};

export default connect()(AccountForm);
