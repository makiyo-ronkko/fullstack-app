import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../actions';
import { alert } from '../../../actions/alert';
import PropTypes from 'prop-types';

import './Signup.css';

const Signup = (props) => {
  // passing props register, alert, authenticated

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const inputHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      // console.log('Password do not match!');
      props.alert('Passwords unmatched. Please try again.', 'red');
    } else {
      props.register(formData.name, formData.email, formData.password);
      setSubmitted(true);
      props.alert('Registration success', 'blue');
    }
  };

  // if authenticated, redirect
  if (props.authenticated) {
    return <Redirect to='/create-profile' />;
  }

  return (
    <Fragment>
      <div className='Signup-background'>
        <div className='light-overlay'>
          <div className='container'>
            <form className='Form' onSubmit={submitHandler}>
              <div className='Form-row'>
                <h1>Registration</h1>
              </div>

              <div className='Form-row'>
                <input
                  type='text'
                  placeholder='Name'
                  name='name'
                  onChange={inputHandler}
                  value={formData.name}
                />
              </div>
              {submitted && !formData.name && <p>Name is required</p>}

              <div className='Form-row'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  onChange={inputHandler}
                  value={formData.email}
                />
              </div>
              {submitted && !formData.email && <p>Email is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={inputHandler}
                  value={formData.password}
                />
              </div>
              {submitted && !formData.password && <p>Password is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Confirm password'
                  name='password2'
                  onChange={inputHandler}
                  value={formData.password2}
                />
              </div>
              {submitted && !formData.password2 && <p>Confirm your password</p>}

              <div className='Form-row'>
                <button type='submit'>Register</button>
              </div>
              <div className='Form-row'>
                You already have an account?
                <Link to='login' className='Form-redirect'>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { register, alert })(Signup);
