import axios from 'axios';
import { alert } from './alert';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
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
