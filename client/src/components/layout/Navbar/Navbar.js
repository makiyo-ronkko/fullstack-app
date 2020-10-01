import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/index';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = (props) => {
  // passing logout props, auth

  const isAuthenticated = (
    <ul>
      <li>
        <Link to='/gallery'>Gallery</Link>
      </li>
      <li>
        <Link to='/profile'>
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <a onClick={props.logout} href='#!'>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const notAuthenticated = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='Navbar'>
      <h1>
        <Link to='/'>Main page</Link>
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
