import { alert } from './alert';
import axiosInterceptor from '../utils/axiosInterceptor';
// import setAuthToken from '../utils/setAuthToken';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  AUTH_USER,
  AUTH_FAIL,
  LOGOUT,
} from './types';

// User authentication
// Check if there is a token
// If yes, add to global headers
// Always send token
export const authUser = () => async (dispatch) => {
  /* if (localStorage.token) {
    // helper function, add token to headers
    setAuthToken(localStorage.token);
  } */
  try {
    // After token is set to headers, make a request
    const response = await axiosInterceptor.get('/auth');
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

// User registration
export const register = (name, email, password) => async (dispatch) => {
  // axios.post(URL, HTTP request body,  content-type header to application/json)
  /* const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // axios serializes the object body to JSON
  const body = JSON.stringify({ name, email, password }); */

  try {
    const response = await axiosInterceptor.post('/users', {
      name,
      email,
      password,
    });
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });
    // Dispatch authUser action to run immediately
    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alert(error.msg, 'red')));
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

// User signin
export const signin = (email, password) => async (dispatch) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  // const body = JSON.stringify({ email, password });

  try {
    const response = await axiosInterceptor.post('/auth', { email, password });
    // If post() is ok
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: response.data, //payload = token
    });
    // Dispatch authUser action to run immediately
    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alert(error.msg, 'red')));
    }
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
