import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { END } from 'redux-saga';
import axios from 'axios';

import {
  Bottom,
  Box,
  Btn,
  Container,
  Header,
  ManMain,
  GirlMain,
} from '../components/home/styled';
import PostCard from '../components/post/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post/postAction';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/userAction';
import wrapper from '../store/configureStore';

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

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
        <ManMain>
          {/* <Slider {...settings}>
            {mainPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Slider> */}
        </ManMain>
      </Header>
      <Btn>
        <button type="button">상품 보러가기</button>
      </Btn>

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
        <GirlMain>
          {/* <Slider {...settings}>
            {mainPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Slider> */}
        </GirlMain>
      </Bottom>
      <Btn>
        <button type="button">상품 보러가기</button>
      </Btn>
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
