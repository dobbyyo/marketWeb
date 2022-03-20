import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import styled from 'styled-components';
import Card from '../../components/card/Card';
import {
  LOAD_CATEGORY_LENGTH_REQUEST,
  LOAD_CATEGORY_POSTS_REQUEST,
} from '../../reducers/post/postAction';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user/userAction';
import wrapper from '../../store/configureStore';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 90%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(460px, auto));
  grid-gap: 1.2rem;
  margin-top: 10rem;
`;

const Category = () => {
  const { mainPosts, hasMorePosts, loadCategoryPostsLoading } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    if (inView && hasMorePosts && !loadCategoryPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      console.log(lastId);
      dispatch({
        type: LOAD_CATEGORY_POSTS_REQUEST,
        lastId,
        data: category,
      });
    }
  }, [inView, hasMorePosts, loadCategoryPostsLoading, mainPosts]);

  return (
    <Container>
      <CardContainer>
        {mainPosts && mainPosts.map((v) => <Card key={v.id} data={v} />)}
      </CardContainer>
      <div ref={hasMorePosts && !loadCategoryPostsLoading ? ref : undefined} />
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
        type: LOAD_CATEGORY_POSTS_REQUEST,
        data: params.category,
      });
      store.dispatch({
        type: LOAD_CATEGORY_LENGTH_REQUEST,
        data: params.category,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Category;
