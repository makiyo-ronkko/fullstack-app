import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/index';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = (props) => {
  // passing logout props, auth

  const [toggle, setToggle] = useState(false);
  // const [fadeOut, setFadeOut] = useState(false);

  const openToggle = () => {
    setToggle(!toggle);
    // setFadeOut(true);
    setTimeout(() => {
      // setFadeOut(true);
      setToggle(toggle);
    }, 3000);
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
            // <ul className={`${fadeOut && 'fadeout'}`}>
            <ul>
              <li>
                <NavLink exact to='/profile'>
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <a onClick={props.logout} href='#!'>
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
      <h1>
        <NavLink
          exact
          to='/'
          activeStyle={{
            fontWeight: 'bolder',
          }}
        >
          Main page
        </NavLink>
      </h1>
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
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
