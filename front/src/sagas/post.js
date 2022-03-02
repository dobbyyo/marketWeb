import axios from 'axios';
import {
  all,
  call,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
import shortid from 'shortid';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  fakerPostData,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../reducers/post/postAction';
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user/userAction';

async function loadPostAPI(data) {
  const res = await axios.get('/posts', data);
  return res;
}

function* loadPosts(action) {
  try {
    // const result = yield call(loadPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: fakerPostData(10),
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      payload: err.response.data,
    });
  }
}

async function addPostAPI(data) {
  const res = await axios.post('/post', data);
  return res;
}
function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      payload: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

async function removePostAPI(data) {
  const res = await axios.delete('/post', data);
  return res;
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: action.data,
    });
    yield put({
      type: REMOVE_POST_TO_ME,
      payload: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      payload: err.response.data,
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

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchAddPost), fork(watchRemovePost)]);
}
