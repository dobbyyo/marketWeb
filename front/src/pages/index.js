import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { BoxLeft, Container, Header, Main } from '../components/home/styled';
import PostCard from '../components/post/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post/postAction';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  // const { me } = useSelector((state) => state.user);
  const [start, setStart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mainPosts.length < 5) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
    }
  }, []);

  console.log(mainPosts);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

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
        <Slider {...settings}>
          {mainPosts.map((c) => (
            <PostCard key={c.id} post={c} />
          ))}
        </Slider>
      </Main>
    </Container>
  );
};

export default Home;
