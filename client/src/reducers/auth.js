import {
	SIGNUP_SUCCESS,
	SIGNIN_SUCCESS,
	AUTH_USER,
	AUTH_FAIL,
	LOGOUT,
	DELETE_ACCOUNT,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'), // store token to localStorage
	authenticated: null, // to be true when SIGNIN_SUCCESS
	loading: true,
	user: null, // user data from auth
};

export default function (state = initialState, action) {
	switch (action.type) {
		case AUTH_USER:
			return {
				...state,
				authenticated: true, // there is token
				loading: false,
				user: action.payload,
				// user incuded in payload (res.data)..name, email, avatar etc. except password
				// backend .select('-password')
			};
		case SIGNUP_SUCCESS:
			// localStorage.setItem('token', action.payload.token);
			// save token came from backend to localStorage
			return {
				...state,
				...action.payload, // payload is token
				authenticated: true,
				loading: false,
			};
		case SIGNIN_SUCCESS:
			// localStorage.setItem('token', action.payload.token);
			// save token came from backend to localStorage
			return {
				...state,
				...action.payload, // payload is token
				authenticated: true,
				loading: false,
			};

		case AUTH_FAIL:
		case LOGOUT:
		case DELETE_ACCOUNT:
			// localStorage.removeItem('token');
			// remove token completely from localStorage
			return {
				...state,
				token: null, // remove token from localStorage
				authenticated: false,
				loading: false,
				user: null,
			};

		default:
			return state;
	}
}
