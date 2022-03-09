import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  SEARCH_POSTS_FAILURE,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post/postAction';
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user/userAction';

// 모든 게시글 불러오기
async function loadPostsAPI(lastId) {
  const res = await axios.get(`/posts?lastId=${lastId || 0}`);
  return res;
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

// 특정 게시글 불러오기
async function loadPostAPI(postId) {
  const res = await axios.get(`/post/${postId}`);
  return res;
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// 특정 유저 게시글 전체 불러오기
async function loadUserPostsAPI(userId, lastId) {
  const res = axios.get(`/user/${userId}/posts?lastId=${lastId}`);
  return res;
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

// 게시글 추가
async function addPostAPI(data) {
  const res = await axios.post('/post', data);
  //  FormData는 {content: data} 이런식으로 감싸서 보내면 안된다.
  return res;
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 게시글 삭제
async function removePostAPI(data) {
  const res = await axios.delete(`/post/${data}`);
  return res;
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_TO_ME,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 이미지 업로드
async function uploadImagesAPI(data) {
  const res = await axios.post('/post/images', data);
  return res;
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

// 포스터 좋아요
async function likePostAPI(postId) {
  const res = await axios.patch(`/post/${postId}/like`);
  return res;
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    console.log(result.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 포스터 싫어요
async function unlikePostAPI(data) {
  const res = await axios.delete(`/post/${data}/like`);
  return res;
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 댓글 작성
async function addCommentAPI(data) {
  const res = await axios.post(`/post/${data.postId}/comment`, data);
  return res;
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

// 검색
async function SearchPostsAPI(data) {
  const res = await axios.get(`/post/${encodeURIComponent(data)}/posts`, data);
  return res;
}

function* searchPosts(action) {
  try {
    console.log(action.data);
    const result = yield call(SearchPostsAPI, action.data);
    console.log(result);
    yield put({
      type: SEARCH_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SEARCH_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchPostLike() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchPostUnLike() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchSearchPosts() {
  yield takeLatest(SEARCH_POSTS_REQUEST, searchPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchUploadImages),
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchPostLike),
    fork(watchPostUnLike),
    fork(watchAddComment),
    fork(watchSearchPosts),
  ]);
}
