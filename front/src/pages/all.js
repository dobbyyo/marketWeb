import { END } from '@redux-saga/core';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LOAD_POSTS_REQUEST } from '../reducers/post/postAction';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/userAction';

import wrapper from '../store/configureStore';
import Card from '../components/card/Card';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  grid-gap: 1rem;
  margin-top: 2rem;
`;

const Man = () => {
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <Container>
      <CardContainer>
        {mainPosts &&
          mainPosts.map(
            (v) => v.people === '공동' && <Card key={v.id} data={v} />,
          )}
      </CardContainer>
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
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Man;
