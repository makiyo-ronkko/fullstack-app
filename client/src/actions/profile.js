import axios from 'axios';
import { alert } from './alert';
import { FETCH_PROFILE, PROFILE_FAIL } from './types';

// fetch current user's profile - profile/user
export const fetchUserProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('/profile/user');
    dispatch({
      type: FETCH_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Create or update profile
// 2 parameters (submitted data and history)
// history object has push method to redirect to client-side route after submitted
// can have separate edit function but can be also passing as parameter
export const createProfile = (data, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/profile', data, config);
    dispatch({
      type: FETCH_PROFILE,
      payload: response.data, // actual profile data
    });

    history.push('/profile');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alert(error.message)));
    }

    dispatch({
      type: PROFILE_FAIL,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
