// Helper function
// If there is a token, add to headers
// If not, delete from headers

import axios from 'axios';

const tokenAuth = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token; // add token to headers
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default tokenAuth;
