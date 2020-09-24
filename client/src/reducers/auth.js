import { SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'), // store token to localStorage
  authenticated: null, // to be true when SIGNIN_SUCCESS
  loading: true,
  user: null, // user data from auth
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.payload.token); // save token came from backend to localStorage
      return {
        ...state,
        ...action.payload, // payload is token
        authenticated: true,
        loading: false,
      };
    case SIGNUP_FAIL:
      localStorage.removeItem('token'); // remove token completely from localStorage
      return {
        ...state,
        token: null, // remove token from localStorage
        authenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
