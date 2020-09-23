import React from 'react';
import './Signin.css';

const Signin = () => {
  return (
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
  );
};

export default Signin;
