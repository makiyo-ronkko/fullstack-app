import { FETCH_PROFILE, PROFILE_FAIL, PROFILE_CLEAR } from '../actions/types';

const initialState = {
  profile: null, // fetch all profile data from backend including login and other users
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case PROFILE_CLEAR:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
