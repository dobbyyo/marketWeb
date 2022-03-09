import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { END } from 'redux-saga';
import styled from 'styled-components';
import Card from '../../components/card/Card';
import { SEARCH_POSTS_REQUEST } from '../../reducers/post/postAction';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user/userAction';
import wrapper from '../../store/configureStore';

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
  grid-template-columns: repeat(4, minmax(100px, auto));
  grid-gap: 1rem;
`;
const Div = styled.div`
  width: 100%;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const Title = () => {
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <Container>
      {mainPosts[0] ? (
        <CardContainer>
          {mainPosts &&
            mainPosts.map((post) => <Card key={post.id} data={post} />)}
        </CardContainer>
      ) : (
        <Div>게시글이 존재하지 않습니다.</Div>
      )}
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
        type: SEARCH_POSTS_REQUEST,
        data: params.title,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Title;
