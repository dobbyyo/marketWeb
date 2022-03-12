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
import { useRouter } from 'next/router';

import wrapper from '../../store/configureStore';
import {
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
} from '../../components/profilecard/styled';
import Card from '../../components/card/Card';
import UserForm from '../../components/profilecard/UserForm';

const Post = () => {
  const dispatch = useDispatch();
  // const id = useSelector((state) => state.user.me?.id);
  const [storeOpen, setStoreOpen] = useState(false);
  const [barOpen, setBarOpen] = useState(false);

  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo, nicknameChangeDone } = useSelector((state) => state.user);

  const onClickStore = useCallback(() => {
    setStoreOpen((cur) => !cur);
  }, [setStoreOpen]);
  const onClickBar = useCallback(() => {
    setBarOpen((cur) => !cur);
  }, [setBarOpen]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
  }, [nicknameChangeDone]);

  return (
    <Container>
      <Box>
        <Header>
          <div className="headerIcon">
            <FontAwesomeIcon icon={faArrowLeft} />
            {barOpen ? (
              <FontAwesomeIcon icon={faBarsStaggered} onClick={onClickBar} />
            ) : (
              <FontAwesomeIcon icon={faBars} onClick={onClickBar} />
            )}
          </div>

          <div className="b">
            {userInfo && (
              <>
                <div className="icon" />
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
                  <div onClick={onClickStore} style={{ cursor: 'pointer' }}>
                    판매상품
                  </div>
                  <div>팔로워</div>
                  <div>팔로우</div>
                </div>
                <div className="infoValue">
                  {userInfo && (
                    <>
                      <div>{userInfo.Posts}</div>
                      <div>{userInfo.Followings}</div>
                      <div>{userInfo.Followers}</div>
                    </>
                  )}
                </div>
              </div>
              <div className="btn">
                <FollowBtn />
                <button type="button">Message</button>
              </div>
            </Main>
            <Footer>
              {storeOpen ? (
                mainPosts.map((post) => <Card data={post} key={post.id} />)
              ) : (
                <>자기소개 글</>
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
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Post;
