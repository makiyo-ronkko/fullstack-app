import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../actions';
import { alert } from '../../../actions/alert';
import PropTypes from 'prop-types';

import './Signup.css';

const Signup = (props) => {
  // passing props register, alert, authenticated

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const input = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const submit = (e) => {
    e.preventDefault();
    if (data.password !== data.password2) {
      // console.log('Password do not match!');
      props.alert('Passwords unmatched. Please try again.', 'red');
    } else {
      props.register(data.name, data.email, data.password);
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
            <form className='Form' onSubmit={submit}>
              <div className='Form-row'>
                <h1>Registration</h1>
              </div>

              <div className='Form-row'>
                <input
                  type='text'
                  placeholder='Name'
                  name='name'
                  onChange={input}
                  value={data.name}
                />
              </div>
              {submitted && !data.name && <p>Name is required</p>}

              <div className='Form-row'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  onChange={input}
                  value={data.email}
                />
              </div>
              {submitted && !data.email && <p>Email is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={input}
                  value={data.password}
                />
              </div>
              {submitted && !data.password && <p>Password is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Confirm password'
                  name='password2'
                  onChange={input}
                  value={data.password2}
                />
              </div>
              {submitted && !data.password2 && <p>Confirm your password</p>}

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
