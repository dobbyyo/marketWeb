export const initialState = {
  me: null,
  userInfo: null,

  // 로그인
  logInLoading: false,
  logInDone: false,
  loginError: null,

  // 회원가입
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,

  // 로그아웃
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  // 로그인 유저 정보 가져오기
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  // 특정 유저 정보 가져오기 시도중
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
};

// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// 회원가입
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// 로그인 유저 정보 가져오기
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

// 특정 유저 정보 가져오기
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

// 포스터에서 게시글 추가할때 자기 ID에 추가하는 액션
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
// 포스터 내 글에서 제거
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';
