import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft,
  faCommentDots,
  faHeart,
  faHeartCrack,
} from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import ImgCard from './ImgCard';
import noImg from '../../img/noimg.png';
import {
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../../reducers/post/postAction';
import CommentCard from '../commnet/CommentCard';

const BoxContainer = styled.div`
  width: 50%;
  /* height: 90rem; */
  background-color: ${(props) => props.theme.white.top};
  color: ${(props) => props.theme.black.top};
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  font-size: 1.4rem;
  border-bottom: 2px solid #000;
  align-items: center;
  padding: 0 2rem;
  .header__left {
    width: 50%;
    display: flex;
    div {
      margin-left: 1rem;
    }
  }
  .header__right {
    width: 50%;
    display: flex;
    justify-content: end;
  }
`;
const Info = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 0 2rem;
  .main {
    margin-top: 1rem;
    width: 100%;
    height: 10rem;
    border: 1px solid #000;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    border-top: 2px solid #000;
    padding: 1rem 0;
    align-items: center;
    .commentBtn {
      width: 5rem;
      height: 2rem;
      background-color: ${(props) => props.theme.red};
      border: none;
      border-radius: 0.5rem;
      color: ${(props) => props.theme.white.top};
      font-size: 1.1rem;
      font-weight: bold;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 5rem;
      height: 2rem;
      background-color: ${(props) => props.theme.red};
      border: none;
      border-radius: 0.5rem;
      color: ${(props) => props.theme.white.top};
      &:hover {
        opacity: 0.8;
      }
      .icon {
        margin-right: 0.5rem;
      }
    }
  }
`;

const Img = styled.img`
  width: 90%;
  height: 20rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const [commentOpen, setCommentOpen] = useState(false);

  const onClickComment = useCallback(() => {
    setCommentOpen((cur) => !cur);
  });

  const onClickBack = useCallback(() => {
    Router.push('/girl');
  });
  const onClickLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onClickUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post && post.Likers.find((v) => v.id === id);
  console.log(commentOpen);
  return (
    <BoxContainer>
      {post && (
        <>
          <Header>
            <div className="header__left">
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                onClick={onClickBack}
                style={{ cursor: 'pointer' }}
              />
              <div>{post.User.nickname}</div>
            </div>
            <div className="header__right">제목: {post.title}</div>
          </Header>
          {post.Images[0] ? (
            <ImgCard images={post.Images} />
          ) : (
            <Img src={noImg.src} alt="img" />
          )}
          <Info>
            <div className="middle">
              <div>가격: {post.price}</div>

              {liked ? (
                <button type="button" onClick={onClickUnLike}>
                  <FontAwesomeIcon icon={faHeartCrack} className="icon" />
                  싫어요
                </button>
              ) : (
                <button type="button" onClick={onClickLike}>
                  <FontAwesomeIcon icon={faHeart} className="icon" />
                  좋아요
                </button>
              )}
            </div>
            <div className="main">{post.content}</div>
            <div className="footer">
              <div>종류: {post.clothes}</div>
              <div>
                <button
                  type="button"
                  className="commentBtn"
                  onClick={onClickComment}
                >
                  <FontAwesomeIcon icon={faCommentDots} />
                </button>
              </div>
              <div>성별: {post.people}</div>
            </div>
            {commentOpen ? <CommentCard post={post} /> : null}
          </Info>
        </>
      )}
    </BoxContainer>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    Comment: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    UserId: PropTypes.number,
    clothes: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    people: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string,
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
