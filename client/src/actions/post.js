import axiosInterceptor from '../utils/axiosInterceptor';
import { alert } from './alert';
import { FETCH_POSTS, POST_FAIL } from './types';

// fetch all posts
export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await axiosInterceptor.get('/posts');
    dispatch({
      type: FETCH_POSTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
