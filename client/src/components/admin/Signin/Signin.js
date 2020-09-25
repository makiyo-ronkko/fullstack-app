import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { signin } from '../../../actions/index';
import PropTypes from 'prop-types';

import './Signin.css';

const Signin = (props) => {
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
  };

  return (
    <Fragment>
      <div className='Signin-background'>
        <div className='container light-overlay'>
          <div className='container'>
            <form className='Form' onSubmit={(e) => submit(e)}>
              <div className='Form-row'>
                <h1>Log in</h1>
              </div>
              <div className='Form-row'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={data.email}
                  onChange={(e) => input(e)}
                />
              </div>
              {submitted && !data.email && <p>Email is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={data.password}
                  onChange={(e) => input(e)}
                />
              </div>
              {submitted && !data.password && <p>Password is required</p>}

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

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
};

export default connect(null, { signin })(Signin);
