import axios from 'axios';
import { alert } from './alert';
import tokenAuth from '../utils/tokenAuth';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  AUTH_USER,
  AUTH_FAIL,
  LOGOUT,
} from './types';

// User registration
export const register = (name, email, password) => async (dispatch) => {
  // axios.post(URL, HTTP request body,  content-type header to application/json)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // axios serializes the object body to JSON
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await axios.post('/users', body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.erros;
    if (errors) {
      //console.log('Error', err.message);
      errors.forEach((error) => dispatch(alert(error.message)));
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

// User signin
export const signin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post('/auth', body, config);
    // If post() is ok
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: response.data, //payload = token
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alert(error.message)));
    }
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

// User authentication
// Check if there is a token
// If yes, add to global headers
// Always send token
export const authUser = () => async (dispatch) => {
  if (localStorage.token) {
    // helper function, add token to headers
    tokenAuth(localStorage.token);
  }
  try {
    // After token is set to headers, make a request
    const response = await axios.get('/auth');
    dispatch({
      type: AUTH_USER,
      payload: response.data, // payload is the data sent out from the route '/auth', which is 'user' in reducer
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
