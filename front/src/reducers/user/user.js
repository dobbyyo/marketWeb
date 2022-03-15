import produce from 'immer';
import {
  initialState,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_TO_ME,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  NICKNAME_CHANGE_REQUEST,
  NICKNAME_CHANGE_SUCCESS,
  NICKNAME_CHANGE_FAILURE,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  USER_IMAGE_REQUEST,
  USER_IMAGE_SUCCESS,
  USER_IMAGE_FAILURE,
  ADD_USER_IMG_TO_ME_REQUEST,
  ADD_USER_IMG_TO_ME_SUCCESS,
  ADD_USER_IMG_TO_ME_FAILURE,
  REMOVE_IMAGE,
} from './userAction';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // 로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.loginError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.loginError = action.error;
        break;

      // 회원가입
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.imagePaths = [];
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      // 로그아웃
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      // 로그인한 유저 정보 로드
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;

      // 특정 유저 로드
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;

      // 팔로워
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.UserId });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      // 언팔로워
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data.UserId,
        );
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      // 팔로잉 GET
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        draft.me.Followings = action.data;
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      // 팔로워 GET
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.me.Followers = action.data;
        draft.loadFollowersDone = true;
        break;
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;

      // 닉네임 CHANGE
      case NICKNAME_CHANGE_REQUEST:
        draft.nicknameChangeLoading = true;
        draft.nicknameChangeError = null;
        draft.nicknameChangeDone = false;
        break;
      case NICKNAME_CHANGE_SUCCESS:
        draft.nicknameChangeLoading = false;
        draft.me.nickname = action.data.nickname;
        draft.nicknameChangeDone = true;
        break;
      case NICKNAME_CHANGE_FAILURE:
        draft.nicknameChangeLoading = false;
        draft.nicknameChangeError = action.error;
        break;

      // 비밀번호 CHANGE
      case PASSWORD_CHANGE_REQUEST:
        draft.passwordChangeLoading = true;
        draft.passwordChangeError = null;
        draft.passwordChangeDone = false;
        break;
      case PASSWORD_CHANGE_SUCCESS:
        draft.passwordChangeLoading = false;
        draft.me.password = action.data.password;
        draft.passwordChangeDone = true;
        break;
      case PASSWORD_CHANGE_FAILURE:
        draft.passwordChangeLoading = false;
        draft.passwordChangeError = action.error;
        break;

      // 회원탈퇴
      case DELETE_USER_REQUEST:
        draft.deleteUserLoading = true;
        draft.deleteUserError = null;
        draft.deleteUserDone = false;
        break;
      case DELETE_USER_SUCCESS:
        draft.deleteUserLoading = false;
        draft.deleteUserDone = true;
        draft.me = null;
        break;
      case DELETE_USER_FAILURE:
        draft.deleteUserLoading = false;
        draft.deleteUserError = action.error;
        break;

      // 유저 이미지업로드
      case USER_IMAGE_REQUEST:
        draft.userImageLoading = true;
        draft.userImageError = null;
        draft.userImageDone = false;
        break;
      case USER_IMAGE_SUCCESS:
        draft.userImageLoading = false;
        draft.userImageDone = true;
        draft.imagePaths = draft.imagePaths.concat(action.data);
        break;
      case USER_IMAGE_FAILURE:
        draft.userImageLoading = false;
        draft.userImageError = action.error;
        break;

      case ADD_USER_IMG_TO_ME_REQUEST:
        draft.addToMeImgLoading = true;
        draft.addToMeImgError = null;
        draft.addToMeImgDone = false;
        break;
      case ADD_USER_IMG_TO_ME_SUCCESS:
        draft.addToMeImgLoading = false;
        draft.addToMeImgDone = true;
        draft.me.Image = action.data;
        draft.imagePaths = [];
        break;
      case ADD_USER_IMG_TO_ME_FAILURE:
        draft.addToMeImgLoading = false;
        draft.addToMeImgError = action.error;
        break;

      // me 객체에 포스터 추가
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // Me 객체에 포스터 제거
      case REMOVE_POST_TO_ME:
        draft.me.Posts = draft.me.Posts.filter(
          (data) => data.id !== action.data,
        );
        break;

      // Form에서 이미지 삭제
      case REMOVE_IMAGE:
        draft.imagePaths = [];
        break;

      default:
        break;
    }
  });

export default reducer;
