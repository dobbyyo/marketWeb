import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_USER_IMG_TO_ME_FAILURE,
  ADD_USER_IMG_TO_ME_REQUEST,
  ADD_USER_IMG_TO_ME_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_USER_FAILURE,
  LOAD_FOLLOWERS_USER_REQUEST,
  LOAD_FOLLOWERS_USER_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_USER_FAILURE,
  LOAD_FOLLOWINGS_USER_REQUEST,
  LOAD_FOLLOWINGS_USER_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  NICKNAME_CHANGE_FAILURE,
  NICKNAME_CHANGE_REQUEST,
  NICKNAME_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  USER_IMAGE_FAILURE,
  USER_IMAGE_REQUEST,
  USER_IMAGE_SUCCESS,
} from '../reducers/user/userAction';

// 로그인
async function loginAPI(data) {
  const res = await axios.post('/user/login', data);
  return res;
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// 회원가입
async function signupAPI(data) {
  const res = await axios.post('/user/signup', data);
  return res;
}

function* signUp(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
async function logOutAPI() {
  const res = await axios.post('/user/logout');
  return res;
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    console.log(result);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그인한 유저 정보 로드
async function loadMyInfoAPI() {
  const res = await axios.get('/user');
  return res;
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// 특정 유저 정보 로드
async function loadUserAPI(userId) {
  const res = await axios.get(`/user/${userId}`);
  return res;
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// 팔로우
async function followAPI(userId) {
  const res = await axios.patch(`/user/${userId}/follow`);
  return res;
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// 언팔로우
async function unfollowAPI(userId) {
  const res = await axios.delete(`/user/${userId}/follow`);
  return res;
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// 팔루워 GET
function loadFollowersAPI(data) {
  return axios.get('/user/followers', data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

// 팔로잉 GET
function loadFollowingsAPI(data) {
  return axios.get('/user/followings', data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

// 닉네임 변경
function nicknameChangesAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* nicknameChange(action) {
  try {
    const result = yield call(nicknameChangesAPI, action.data);
    yield put({
      type: NICKNAME_CHANGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NICKNAME_CHANGE_FAILURE,
      error: err.response.data,
    });
  }
}

// 비밀번호 변경
function passwordChangesAPI(data) {
  return axios.patch('/user/password', data);
}

function* passwordChange(action) {
  try {
    const result = yield call(passwordChangesAPI, action.data);
    yield put({
      type: PASSWORD_CHANGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PASSWORD_CHANGE_FAILURE,
      error: err.response.data,
    });
  }
}

// 회원탈퇴
function deleteUserAPI(userId) {
  return axios.delete(`/user/${userId}`);
}

function* deleteUser(action) {
  try {
    const result = yield call(deleteUserAPI, action.data);
    yield put({
      type: DELETE_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// 이미지 업로드
async function uploadUserImgAPI(data) {
  const res = axios.post('/user/image', data);
  return res;
}

function* uploadUserImg(action) {
  try {
    const result = yield call(uploadUserImgAPI, action.data);
    yield put({
      type: USER_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// Me에게 이미지 추가
async function uploadUserImgToMeAPI(data) {
  const res = axios.post(`/user/${data.userId}/image/`, data);
  return res;
}

function* uploadUserImgToMe(action) {
  try {
    const result = yield call(uploadUserImgToMeAPI, action.data);
    yield put({
      type: ADD_USER_IMG_TO_ME_SUCCESS,
      data: result.data.src,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_USER_IMG_TO_ME_FAILURE,
      error: err.response.data,
    });
  }
}

// 팔로잉 유저 GET
async function loadFollowingsUserAPI(userId) {
  const res = axios.get(`/posts/${userId}/followings`);
  return res;
}

function* loadFollowingsUser(action) {
  try {
    const result = yield call(loadFollowingsUserAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_USER_FAILURE,
      error: err.response.data,
    });
  }
}
// 팔로워 유저 GET
async function loadFollowersUserAPI(userId) {
  const res = axios.get(`/posts/${userId}/followers`);
  return res;
}

function* loadFollowersUser(action) {
  try {
    const result = yield call(loadFollowersUserAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchNicknameChange() {
  yield takeLatest(NICKNAME_CHANGE_REQUEST, nicknameChange);
}
function* watchPasswordChange() {
  yield takeLatest(PASSWORD_CHANGE_REQUEST, passwordChange);
}
function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}
function* watchUserImageUpload() {
  yield takeLatest(USER_IMAGE_REQUEST, uploadUserImg);
}
function* watchUserImageUploadToMe() {
  yield takeLatest(ADD_USER_IMG_TO_ME_REQUEST, uploadUserImgToMe);
}
function* watchLoadFollowersUser() {
  yield takeLatest(LOAD_FOLLOWERS_USER_REQUEST, loadFollowersUser);
}
function* watchLoadFollowingsUser() {
  yield takeLatest(LOAD_FOLLOWINGS_USER_REQUEST, loadFollowingsUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchNicknameChange),
    fork(watchPasswordChange),
    fork(watchDeleteUser),
    fork(watchUserImageUpload),
    fork(watchUserImageUploadToMe),
    fork(watchLoadFollowersUser),
    fork(watchLoadFollowingsUser),
  ]);
}
