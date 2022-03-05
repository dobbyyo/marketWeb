import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import wrapper from '../../store/configureStore';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_USER_REQUEST,
} from '../../reducers/user/userAction';
import {
  LOAD_POSTS_REQUEST,
  LOAD_USER_POSTS_REQUEST,
} from '../../reducers/post/postAction';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Post = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);

  console.log(mainPosts);
  console.log(userInfo);

  useEffect(() => {
    const lastId = mainPosts[mainPosts.length - 1]?.id;
    dispatch({
      type: LOAD_POSTS_REQUEST,
      lastId,
      data: id,
    });
  }, []);
  return <Container></Container>;
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
