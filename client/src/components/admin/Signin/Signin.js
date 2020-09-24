import React, { Fragment } from 'react';
import './Signin.css';

const Signin = () => {
  return (
    <Fragment>
      <div className='Signin-background'>
        <div className='container light-overlay'>
          <div className='container'>
            <form className='Form'>
              <div className='Form-row'>
                <h1>Log in</h1>
              </div>
              <div className='Form-row'>
                <input type='email' placeholder='email' name='email' />
              </div>
              <div className='Form-row'>
                <input type='password' placeholder='password' name='password' />
              </div>
              <div className='Form-row'>
                <button type='submit'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;
