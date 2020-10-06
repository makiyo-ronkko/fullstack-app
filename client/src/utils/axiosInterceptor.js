import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors are methods which are triggered before the main method.
// response interceptor: this is called before the promise is completed and the data is received
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.msg === 'Token is invalid.') {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default instance;
