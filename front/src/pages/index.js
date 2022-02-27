import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxLeft, Container, Header, Main } from '../components/home/styled';
import PostCard from '../components/post/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post/postAction';

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);
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
        {mainPosts.map((c) => (
          <PostCard key={c.id} post={c} />
        ))}
      </Main>
    </Container>
  );
};

export default Home;
