export const initialState = {
  mainPosts: [],
  imagePaths: [],
  singlePost: null,

  // 글 업로드
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  // 글 제거
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  // 글 불러오기
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  // 글 불러오기
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

  // 특정 유저 게시글 불러오기
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  // 좋아요
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  // 싫어요
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  // 댓글 달기
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  // 검색
  searchPostsLoading: false,
  searchPostsDone: false,
  searchPostsError: null,

  // 포스터 수정
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,

  // 스크롤 내렸을때 이미지 더 불러오기
  morePosts: true,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const SEARCH_POSTS_REQUEST = 'SEARCH_POSTS_REQUEST';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const SEARCH_POSTS_FAILURE = 'SEARCH_POSTS_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';
// 이미지는 기업에서 잘 안지운다고한다. 나중에 딥러니등 여러가지로 활용할수 있으므로.
// 동기액션이다. 만약 서버에서도 이미지를 지우고 싶다면 비동기 액션으로 만들주자.
