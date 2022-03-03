import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;
// withCredentials 를 true로 설정해야 서버랑 프론트가 쿠기 공유가 가능해진다.

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
