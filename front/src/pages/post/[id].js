import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user/userAction';
import { LOAD_POST_REQUEST } from '../../reducers/post/postAction';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Post = () => {
  const router = useRouter();
  const { singlePost } = useSelector((state) => state.post);
  const { id } = router.query;

  console.log(singlePost);

  return <Container>{singlePost.category}</Container>;
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
        type: LOAD_POST_REQUEST,
        data: params.id,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Post;
