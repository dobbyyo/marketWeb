import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import styled from 'styled-components';
import Card from '../components/card/Card';
import { LOAD_SAVE_POSTS_REQUEST } from '../reducers/post/postAction';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/userAction';
import wrapper from '../store/configureStore';

const Container = styled.div`
  width: 100%;
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

const saved = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  // useEffect(() => {
  //   if (!me) {
  //     Router.push('/');
  //   }
  // }, [me]);

  useEffect(() => {
    dispatch({
      type: LOAD_SAVE_POSTS_REQUEST,
      data: me.id,
    });
  }, []);
  console.log(mainPosts);
  return (
    <Container>
      <CardContainer>
        {mainPosts[0] && mainPosts.map((v) => <Card data={v} key={v.id} />)}
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
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default saved;
