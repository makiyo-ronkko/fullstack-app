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
        <form className='Form'>
          <div className='Form-row'>
            <h1>Your Profile Information</h1>
          </div>

          <label for='intro'>Short introduction about yourself</label>
          <div className='Form-row'>
            <input
              type='text'
              placeholder='About yourself'
              name='intro'
              onChange={input}
              value={data.intro}
            />
          </div>

          <label for='website'>Your website:</label>
          <div className='Form-row'>
            <input
              type='url'
              placeholder='https://example.com'
              pattern='https//.*'
              name='website'
              onChange={input}
              value={data.website}
            />
          </div>

          <label for='location'>Where do you live?</label>
          <div className='Form-row'>
            <input
              type='text'
              placeholder='location'
              name='location'
              onChange={input}
              value={data.location}
            />
          </div>

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
