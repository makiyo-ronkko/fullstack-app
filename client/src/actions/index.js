import axios from 'axios';
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';

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
      console.log('Error', err.message);
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};
