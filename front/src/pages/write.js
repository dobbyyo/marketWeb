import axios from 'axios';
import React from 'react';
import { END } from 'redux-saga';
import styled from 'styled-components';

import PostForm from '../components/post/PostForm';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/userAction';
import wrapper from '../store/configureStore';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const post = () => {
  return (
    <Container>
      <PostForm />
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default post;

// 제목, 설명, 가격, 의류 카테고리, 성별 카테고리, 해시태그, 이미지
