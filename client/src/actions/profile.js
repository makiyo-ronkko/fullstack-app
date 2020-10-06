import axiosInterceptor from '../utils/axiosInterceptor';
import { alert } from './alert';
import { FETCH_PROFILE, PROFILE_FAIL } from './types';

// fetch current user's profile - profile/user
export const fetchUserProfile = () => async (dispatch) => {
  try {
    const response = await axiosInterceptor.get('/profile/user');
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
export const createProfile = (data, history, edit = false) => async (
  dispatch
) => {
  try {
    const response = await axiosInterceptor.post('/profile', data);
    dispatch({
      type: FETCH_PROFILE,
      payload: response.data, // actual profile data
    });

    // if edit is true
    dispatch(alert(edit ? 'Profile Updated' : 'Profile Created', 'blue'));

    if (!edit) {
      history.push('/profile');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alert(error.message, 'red')));
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
