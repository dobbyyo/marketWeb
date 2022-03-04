import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { END } from 'redux-saga';

import { BoxLeft, Container, Header, Main } from '../components/home/styled';
import PostCard from '../components/post/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post/postAction';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/userAction';
import wrapper from '../store/configureStore';
import axios from 'axios';

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  //   if (mainPosts.length < 1) {
  //     dispatch({
  //       type: LOAD_POSTS_REQUEST,
  //     });
  //   }
  // }, []);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 2,
  // };

  return (
    <Container>
      <Header>
        <BoxLeft>
          <div>
            <h1>
              We Always <br /> Provide <br /> Best Services
            </h1>
          </div>
          <div>
            <p>
              We are always doing our best for the best <br /> quality and
              customer satisfaction. <br />
              We respond immediately to customer feedback.
            </p>
          </div>
        </BoxLeft>
      </Header>
      <Main>
        {/* <Slider {...settings}>
          {mainPosts.map((c) => (
            <PostCard key={c.id} post={c} />
          ))}
        </Slider> */}
      </Main>
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
