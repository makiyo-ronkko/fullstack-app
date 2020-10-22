import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/index';
import { alert } from '../../../actions/alert';
import PropTypes from 'prop-types';
import './Navbar.css';
import logo from '../../../img/logo.png';

const Navbar = (props) => {
  // passing logout props, auth

  const [toggle, setToggle] = useState(false);

  const openToggle = () => {
    setToggle(!toggle);
    setTimeout(() => {
      setToggle(toggle);
    }, 5000);
  };

  const logoutHandler = () => {
    props.logout();
    props.alert('You have logged out', 'blue');
  };

  const isAuthenticated = (
    <Fragment>
      <ul>
        <li>
          <NavLink exact to='/gallery'>
            Gallery
          </NavLink>
        </li>
        <li className='Navbar-bars'>
          <div className='burger'>
            <i className='fas fa-user' onClick={openToggle} />
          </div>
          {toggle && (
            <ul>
              <li>
                <NavLink exact to='/profile'>
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <a onClick={logoutHandler} href='#!'>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </Fragment>
  );

  const notAuthenticated = (
    <ul>
      <li>
        <NavLink exact to='/register'>
          Register
        </NavLink>
      </li>
      <li>
        <NavLink exact to='/login'>
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className='Navbar'>
      <NavLink
        exact
        to='/'
        activeStyle={{
          fontWeight: 'bolder',
        }}
      >
        <img src={logo} className='logo' style={{ padding: '0 2rem 0 0;' }} />
      </NavLink>

      {!props.loading && (
        <Fragment>
          {props.authenticated ? isAuthenticated : notAuthenticated}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.prooTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  alert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout, alert })(Navbar);
