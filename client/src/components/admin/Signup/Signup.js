import React, { Fragment } from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <Fragment>
      <div className='container'>
        <form className='Form'>
          <div className='Form-row'>
            <h1>Registration</h1>
          </div>
          <div className='Form-row'>
            <input type='text' placeholder='name' name='name' />
          </div>
          <div className='Form-row'>
            <input type='email' placeholder='email' name='email' />
          </div>
          <div className='Form-row'>
            <input type='password' placeholder='password' name='password' />
          </div>
          <div className='Form-row'>
            <input
              type='password'
              placeholder='confirm password'
              name='password2'
            />
          </div>
          <div className='Form-row'>
            <button type='submit'>Register</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
