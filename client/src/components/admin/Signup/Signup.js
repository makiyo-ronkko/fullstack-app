import React, { Fragment, useState } from 'react';
import './Signup.css';
import { connect } from 'react-redux';
import { register } from '../../../actions';
import { alert } from '../../../actions/alert';
import PropTypes from 'prop-types';

const Signup = (props) => {
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
      console.log('Password do not match!');
      props.alert('Password do not match');
    } else {
      props.register(data.name, data.email, data.password);
      setSubmitted(true);
    }
  };

  return (
    <Fragment>
      <div className='Signup-background'>
        <div className='container light-overlay'>
          <div className='container'>
            <form className='Form' onSubmit={(e) => submit(e)}>
              <div className='Form-row'>
                <h1>Registration</h1>
              </div>

              <div className='Form-row'>
                <input
                  type='text'
                  placeholder='Name'
                  name='name'
                  onChange={(e) => input(e)}
                  value={data.name}
                />
              </div>
              {submitted && !data.name && <p>Name is required</p>}

              <div className='Form-row'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  onChange={(e) => input(e)}
                  value={data.email}
                />
              </div>
              {submitted && !data.email && <p>Email is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={(e) => input(e)}
                  value={data.password}
                />
              </div>
              {submitted && !data.password && <p>Password is required</p>}

              <div className='Form-row'>
                <input
                  type='password'
                  placeholder='Confirm password'
                  name='password2'
                  onChange={(e) => input(e)}
                  value={data.password2}
                />
              </div>
              {submitted && !data.password2 && <p>Confirm your password</p>}

              <div className='Form-row'>
                <button type='submit'>Register</button>
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
};

export default connect(null, { register, alert })(Signup);
