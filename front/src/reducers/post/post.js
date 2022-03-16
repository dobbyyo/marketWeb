import produce from 'immer';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  COMMENT_DELETE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_UPDATE_FAILURE,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  initialState,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_SAVE_POSTS_FAILURE,
  LOAD_SAVE_POSTS_REQUEST,
  LOAD_SAVE_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  REMOVE_IMAGE,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_SAVE_POSTS_FAILURE,
  REMOVE_SAVE_POSTS_REQUEST,
  REMOVE_SAVE_POSTS_SUCCESS,
  SAVE_POSTS_FAILURE,
  SAVE_POSTS_REQUEST,
  SAVE_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPDATE_IMAGES_FAILURE,
  UPDATE_IMAGES_REQUEST,
  UPDATE_IMAGES_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from './postAction';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // 글 올리기
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      // 글 제거
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS: {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId,
        );
        break;
      }
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      // 모든글 불러오기
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      // 특정 유저 글한개 불러오기
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      // 특정 유저 포스터 전체 로드
      case LOAD_USER_POSTS_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data;
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      // 이미지 업로드
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        draft.imagePaths = draft.imagePaths.concat(action.data);
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      // 포스터 좋아요
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.singlePost;
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      // 포스터 싫어요
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.singlePost;
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      // 댓글 작성
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        const post = draft.singlePost;
        post.Comments.unshift(action.data);
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      // 검색
      case SEARCH_POSTS_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case SEARCH_POSTS_SUCCESS: {
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        // draft.hasMorePosts = action.data.length === 10;
        break;
      }
      case SEARCH_POSTS_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      // 포스터 수정
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS: {
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.singlePost = action.data;
        draft.singlePost.Images = action.data.Images;
        break;
      }
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;

      // 댓글 삭제
      case COMMENT_DELETE_REQUEST:
        draft.commentDeleteLoading = true;
        draft.commentDeleteDone = false;
        draft.commentDeleteError = null;
        break;
      case COMMENT_DELETE_SUCCESS: {
        draft.commentDeleteLoading = false;
        draft.commentDeleteDone = true;
        const post = draft.singlePost;
        post.Comments = post.Comments.filter(
          (v) => v.id !== action.data.commentId,
        );
        break;
      }
      case COMMENT_DELETE_FAILURE:
        draft.commentDeleteLoading = false;
        draft.commentDeleteError = action.error;
        break;

      // 댓글 수정
      case COMMENT_UPDATE_REQUEST:
        draft.commentDeleteLoading = true;
        draft.commentDeleteDone = false;
        draft.commentDeleteError = null;
        break;
      case COMMENT_UPDATE_SUCCESS: {
        draft.commentDeleteLoading = false;
        draft.commentDeleteDone = true;
        const post = draft.singlePost;
        post.Comments.find((v) => v.id === action.data.commentId).content =
          action.data.content;
        break;
      }
      case COMMENT_UPDATE_FAILURE:
        draft.commentDeleteLoading = false;
        draft.commentDeleteError = action.error;
        break;

      // 포스터 이미지 변경
      case UPDATE_IMAGES_REQUEST:
        draft.updateImagesLoading = true;
        draft.updateImagesError = null;
        draft.updateImagesDone = false;
        break;
      case UPDATE_IMAGES_SUCCESS:
        draft.updateImagesLoading = false;
        draft.updateImagesDone = true;
        draft.imagePaths = draft.imagePaths.concat(action.data);
        break;
      case UPDATE_IMAGES_FAILURE:
        draft.updateImagesLoading = false;
        draft.updateImagesError = action.error;
        break;

      // 해스태그 GET
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.loadHashtagPostsLoading = true;
        draft.loadHashtagPostsError = null;
        draft.loadHashtagPostsDone = false;
        break;
      case LOAD_HASHTAG_POSTS_SUCCESS:
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        break;
      case LOAD_HASHTAG_POSTS_FAILURE:
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsError = action.error;
        break;

      // 게시글 찜
      case SAVE_POSTS_REQUEST:
        draft.savePostsLoading = true;
        draft.savePostsError = null;
        draft.savePostsDone = false;
        break;
      case SAVE_POSTS_SUCCESS: {
        draft.savePostsLoading = false;
        draft.savePostsDone = true;
        const post = draft.singlePost;
        post.Saver.push({ id: action.data.UserId });
        break;
      }
      case SAVE_POSTS_FAILURE:
        draft.savePostsLoading = false;
        draft.savePostsError = action.error;
        break;

      // 게시글 찜 취소
      case REMOVE_SAVE_POSTS_REQUEST:
        draft.removeSavePostsLoading = true;
        draft.removeSavePostsError = null;
        draft.removeSavePostsDone = false;
        break;
      case REMOVE_SAVE_POSTS_SUCCESS: {
        draft.removeSavePostsLoading = false;
        draft.removeSavePostsDone = true;
        const post = draft.singlePost;
        post.Saver = post.Saver.filter((v) => v.id !== action.data.UserId);
        break;
      }
      case REMOVE_SAVE_POSTS_FAILURE:
        draft.removeSavePostsLoading = false;
        draft.removeSavePostsError = action.error;
        break;

      // 찜 GET
      case LOAD_SAVE_POSTS_REQUEST:
        draft.loadSavePostsLoading = true;
        draft.loadSavePostsError = null;
        draft.loadSavePostsDone = false;
        break;
      case LOAD_SAVE_POSTS_SUCCESS: {
        draft.loadSavePostsLoading = false;
        draft.loadSavePostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        break;
      }
      case LOAD_SAVE_POSTS_FAILURE:
        draft.loadSavePostsLoading = false;
        draft.loadSavePostsError = action.error;
        break;

      // Form에서 이미지 삭제
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      // Default
      default:
        break;
    }
  });

export default reducer;
