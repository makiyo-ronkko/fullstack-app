import axiosInterceptor from '../utils/axiosInterceptor';
import { alert } from './alert';
import { FETCH_POSTS, POST_FAIL, POST_LIKE } from './types';

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

// post like
export const postLike = (id) => async (dispatch) => {
  try {
    const response = await axiosInterceptor.put(`/posts/like/${id}`);

    dispatch({
      type: POST_LIKE,
      payload: { id, likes: response.data },
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const response = await axiosInterceptor.put(`/posts/dislike/${id}`);

    dispatch({
      type: POST_LIKE,
      payload: { id, likes: response.data },
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};