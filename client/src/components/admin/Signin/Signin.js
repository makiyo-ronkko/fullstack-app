import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../../../actions/index';
import PropTypes from 'prop-types';

import { alert } from '../../../actions/alert';

import './Signin.css';

const Signin = (props) => {
  // passing props signin, authenticated

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.loading]);

  const inputHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    props.signin(formData.email, formData.password);
    setSubmitted(true);
    props.alert('You have logged in', 'blue');
  };

  if (props.authenticated) {
    return <Redirect to='/gallery' />;
  }

  return (
    <Fragment>
      <div className='Signin-background'>
        <div className='light-overlay'>
          <div className='container'>
            <form className='Form' onSubmit={submitHandler}>
              <div className='Form-row'>
                <h1>Log in</h1>
              </div>
              <div className='Form-row'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={formData.email}
                  onChange={inputHandler}
                />
              </div>
              {submitted && !formData.email && <p>Email is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={formData.password}
                  onChange={inputHandler}
                />
              </div>
              {submitted && !formData.password && <p>Password is required</p>}

              <div className='Form-row'>
                <button type='submit'>Login</button>
              </div>
              <div className='Form-row'>
                You don't have an account?
                <Link to='register' className='Form-redirect'>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  alert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { signin, alert })(Signin);
