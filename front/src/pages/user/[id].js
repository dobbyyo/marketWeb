import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBars,
  faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';
import Router, { useRouter } from 'next/router';

import wrapper from '../../store/configureStore';
import {
  LOAD_FOLLOWERS_USER_REQUEST,
  LOAD_FOLLOWINGS_USER_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOAD_USER_REQUEST,
} from '../../reducers/user/userAction';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post/postAction';
import FollowBtn from '../../components/profilecard/FollowBtn';
import {
  Box,
  Container,
  Footer,
  Header,
  Main,
  Name,
} from '../../components/profilecard/styled';
import Card from '../../components/card/Card';
import UserForm from '../../components/profilecard/UserForm';

const Post = () => {
  const dispatch = useDispatch();
  // const id = useSelector((state) => state.user.me?.id);
  const [storeOpen, setStoreOpen] = useState(false);
  const [barOpen, setBarOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingsOpen, setFollowingsOpen] = useState(false);

  const { mainPosts } = useSelector((state) => state.post);
  const {
    userInfo,
    nicknameChangeDone,
    addToMeImgDone,
    followers,
    followings,
  } = useSelector((state) => state.user);

  console.log(storeOpen, followersOpen, followingsOpen);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const onClickBar = useCallback(() => {
    setBarOpen((cur) => !cur);
  }, [setBarOpen]);

  const onClickStore = useCallback(() => {
    setStoreOpen((cur) => !cur);
    setFollowersOpen(false);
    setFollowingsOpen(false);
  }, [setStoreOpen]);

  const onClickFollowers = useCallback(() => {
    setFollowersOpen((cur) => !cur);
    setStoreOpen(false);
    setFollowingsOpen(false);
  }, [setFollowersOpen]);

  const onClickFollowings = useCallback(() => {
    setFollowingsOpen((cur) => !cur);
    setFollowersOpen(false);
    setStoreOpen(false);
  }, [setFollowingsOpen]);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
  }, [nicknameChangeDone, addToMeImgDone]);

  const onClickMoveUser = useCallback(
    (userId) => () => {
      Router.push(`/user/${userId}`);
    },
    [],
  );
  const onClickBack = useCallback(() => {
    Router.back();
  }, []);
  return (
    <Container>
      <Box>
        <Header>
          <div className="headerIcon">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="icon"
              onClick={onClickBack}
            />
            {barOpen ? (
              <FontAwesomeIcon
                icon={faBarsStaggered}
                onClick={onClickBar}
                className="icon"
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                onClick={onClickBar}
                className="icon"
              />
            )}
          </div>

          <div className="userInfo">
            {userInfo && (
              <>
                {userInfo.Image ? (
                  <img
                    className="avatar"
                    src={`http://localhost:3100/${userInfo.Image.src}`}
                    alt="img"
                  />
                ) : (
                  <div className="avatar" />
                )}
                <div className="name">{userInfo.nickname}</div>
                <div className="id">{userInfo.email}</div>
              </>
            )}
          </div>
        </Header>

        {barOpen ? (
          <>
            <UserForm />
          </>
        ) : (
          <>
            <Main>
              <div className="userInfo">
                <div className="infoName">
                  <button type="button" onClick={onClickStore}>
                    판매상품
                  </button>
                  <button type="button" onClick={onClickFollowers}>
                    팔로워
                  </button>
                  <button type="button" onClick={onClickFollowings}>
                    팔로우
                  </button>
                </div>
                <div className="infoValue">
                  {userInfo && (
                    <>
                      <div>{userInfo.Posts}</div>
                      <div>{userInfo.Followers}</div>
                      <div>{userInfo.Followings}</div>
                    </>
                  )}
                </div>
              </div>
              <div className="btn">
                <FollowBtn />
              </div>
            </Main>
            <Footer>
              {storeOpen &&
                !followersOpen &&
                !followingsOpen &&
                mainPosts.map((post) => <Card data={post} key={post.id} />)}
              {!storeOpen &&
                !followersOpen &&
                followingsOpen &&
                followings.map((v) => (
                  <Name key={v.id} onClick={onClickMoveUser(v.id)}>
                    {v.name}
                  </Name>
                ))}
              {!storeOpen &&
                followersOpen &&
                !followingsOpen &&
                followers.map((v) => (
                  <Name key={v.id} onClick={onClickMoveUser(v.id)}>
                    {v.name}
                  </Name>
                ))}
              {!storeOpen && !followersOpen && !followingsOpen && (
                <div>자기소개글</div>
              )}
            </Footer>
          </>
        )}
      </Box>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_USER_REQUEST,
        data: params.id,
      });
      store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: params.id,
      });
      store.dispatch({
        type: LOAD_FOLLOWINGS_USER_REQUEST,
        data: params.id,
      });
      store.dispatch({
        type: LOAD_FOLLOWERS_USER_REQUEST,
        data: params.id,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Post;
