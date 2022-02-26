import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user/userAction';

// 로그인
async function loginAPI(data) {
  const res = await axios.post('/login', data);
  return res;
}

function* logIn(action) {
  try {
    console.log('Login');
    const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOG_IN_FAILURE,
      payload: action.err,
      //   error: err.response.data,
    });
  }
}

// 회원가입
async function signupAPI(data) {
  const res = await axios.post('/signup', data);
  return res;
}

function* signUp(action) {
  try {
    console.log('SingUp');
    const result = yield call(signupAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SIGN_UP_FAILURE,
      payload: action.err,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchSignUp)]);
}
