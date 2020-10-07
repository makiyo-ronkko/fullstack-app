import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../../../actions/index';
import PropTypes from 'prop-types';

import { alert } from '../../../actions/alert';

import './Signin.css';

const Signin = (props) => {
  // passing props signin, authenticated

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const input = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const submit = (e) => {
    e.preventDefault();
    props.signin(data.email, data.password);
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
            <form className='Form' onSubmit={submit}>
              <div className='Form-row'>
                <h1>Log in</h1>
              </div>
              <div className='Form-row'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={data.email}
                  onChange={input}
                />
              </div>
              {submitted && !data.email && <p>Email is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={data.password}
                  onChange={input}
                />
              </div>
              {submitted && !data.password && <p>Password is required</p>}

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
