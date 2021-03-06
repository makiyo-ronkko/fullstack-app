// Helper function
// If there is a token, add to headers
// If not, delete from headers

import axiosInterceptor from './axiosInterceptor';

const setAuthToken = (token) => {
	if (token) {
		axiosInterceptor.defaults.headers.common['x-auth-token'] = token; // add token to headers
		localStorage.setItem('token', token); // save to localStorage
	} else {
		delete axiosInterceptor.defaults.headers.common['x-auth-token'];
		localStorage.removeItem('token'); // remove token from localStorage
	}
};

export default setAuthToken;
