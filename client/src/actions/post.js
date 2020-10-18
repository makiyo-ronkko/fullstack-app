import axiosInterceptor from '../utils/axiosInterceptor';
import axios from 'axios';
import { alert } from './alert';
import {
  FETCH_POSTS,
  POST_FAIL,
  POST_LIKE,
  DELETE_POST,
  FETCH_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from './types';

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

// fetch post by id
export const fetchPost = (id) => async (dispatch) => {
  try {
    const response = await axiosInterceptor.get(`/posts/${id}`);
    dispatch({
      type: FETCH_POST,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add post
export const addPost = (data) => async (dispatch) => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };

  try {
    const response = await axiosInterceptor.post('/posts', data);
    dispatch({
      type: ADD_POST,
      payload: response.data,
    });

    dispatch(alert('Post uploaded', 'blue'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axiosInterceptor.delete(`/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(alert('Post has removed', 'blue'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
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

// add comment
export const addComment = (postId, data) => async (dispatch) => {
  try {
    const response = await axiosInterceptor.post(
      `/posts/comment/${postId}`,
      data
    );
    console.log('action', response.data, data);
    dispatch({
      type: ADD_COMMENT,
      payload: response.data,
    });

    dispatch(alert('Comment Added', 'blue'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axiosInterceptor.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });

    dispatch(alert('Comment Removed', 'blue'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
