import React, { useCallback } from 'react';
import { END } from 'redux-saga';
import axios from 'axios';
import Router from 'next/router';

import { Bottom, Box, Btn, Container, Header } from '../components/home/styled';
import { LOAD_POSTS_REQUEST } from '../reducers/post/postAction';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/userAction';
import wrapper from '../store/configureStore';

const Home = () => {
  const onClickMan = useCallback(() => {
    Router.push('/man');
  }, []);
  const onClickGirl = useCallback(() => {
    Router.push('/girl');
  }, []);

  return (
    <Container>
      <Header>
        <Box>
          <div>
            <p>
              We are always doing our best for the best <br /> quality and
              customer satisfaction. <br />
              We respond immediately to customer feedback.
            </p>
          </div>
        </Box>
        <Btn className="manBtn" onClick={onClickMan}>
          <button type="button">상품 보러가기</button>
        </Btn>
      </Header>

      <Bottom>
        <Box>
          <div>
            <p>
              We are always doing our best for the best <br /> quality and
              customer satisfaction. <br />
              We respond immediately to customer feedback.
            </p>
          </div>
        </Box>
        <Btn onClick={onClickGirl}>
          <button type="button" className="girlBtn">
            상품 보러가기
          </button>
        </Btn>
      </Bottom>
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
      // 위를 설정해야 쿠키정보가 서버쪽으로 전성이 되어진다.
      // if문을 통해 저렇게 설정해야 로그인이 공유되는 문제가 생기므로 주의하자.

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
// getServerSideProps는 순전히 프론트에서만 실행. 브라우저 x
export default Home;
