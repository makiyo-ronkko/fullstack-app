import React, { Fragment, useState } from 'react';
import './Signup.css';
import { connect } from 'react-redux';
import { register } from '../../../actions';
import PropTypes from 'prop-types';

const Signup = (props) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const input = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const submit = (e) => {
    e.preventDefault();
    if (data.password !== data.password2) {
      console.log('Password do not match!');
    } else {
      props.register(data.name, data.email, data.password);
    }
  };

  return (
    <Fragment>
      <div className='container'>
        <form className='Form' onSubmit={(e) => submit(e)}>
          <div className='Form-row'>
            <h1>Registration</h1>
          </div>
          <div className='Form-row'>
            <input
              type='text'
              placeholder='name'
              name='name'
              onChange={(e) => input(e)}
            />
          </div>
          <div className='Form-row'>
            <input
              type='email'
              placeholder='email'
              name='email'
              onChange={(e) => input(e)}
            />
          </div>
          <div className='Form-row'>
            <input
              type='password'
              placeholder='password'
              name='password'
              onChange={(e) => input(e)}
            />
          </div>
          <div className='Form-row'>
            <input
              type='password'
              placeholder='confirm password'
              name='password2'
              onChange={(e) => input(e)}
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

Signup.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(Signup);
