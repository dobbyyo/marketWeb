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

  // 로그인 유저 정보 Get
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  // 특정 유저 정보 Get
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

  // 팔로워
  followLoading: false,
  followDone: false,
  followError: null,

  // 언팔로워
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  // 팔로워 팔로잉 Get
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  // 아이디 변경
  nicknameChangeLoading: false,
  nicknameChangeDone: false,
  nicknameChangeError: null,

  // 비밀번호 변경
  passwordChangeLoading: false,
  passwordChangeDone: false,
  passwordChangeError: null,

  // 회원탈퇴
  deleteUserLoading: false,
  deleteUserDone: false,
  deleteUserError: null,
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

// 팔로워
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

// 팔로우
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

// 팔로우 get
export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

// 팔로잉 get
export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

// 닉네임 Change
export const NICKNAME_CHANGE_REQUEST = 'NICKNAME_CHANGE_REQUEST';
export const NICKNAME_CHANGE_SUCCESS = 'NICKNAME_CHANGE_SUCCESS';
export const NICKNAME_CHANGE_FAILURE = 'NICKNAME_CHANGE_FAILURE';

// 비밀번호 Change
export const PASSWORD_CHANGE_REQUEST = 'PASSWORD_CHANGE_REQUEST';
export const PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS';
export const PASSWORD_CHANGE_FAILURE = 'PASSWORD_CHANGE_FAILURE';

// 비밀번호 Change
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// 포스터에서 게시글 추가할때 자기 ID에 추가하는 액션
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
// 포스터 내 글에서 제거
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';
