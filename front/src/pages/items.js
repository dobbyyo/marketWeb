import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

import ItemsCard from '../components/items/ItemsCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post/postAction';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const items = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const { mainPosts, morePosts, loadPostsLoading, removePostDone } =
    useSelector((state) => state.post);

  console.log(inView, morePosts, !loadPostsLoading);
  useEffect(() => {
    if (!loadPostsLoading || removePostDone) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
      });
    }
  }, [removePostDone]);

  return (
    <Container>
      {/* {mainPosts[0] && ( */}
      <>
        {mainPosts.map((post) => (
          <ItemsCard key={post} post={post} />
        ))}
        <div
          style={{ height: '2rem' }}
          // ref={morePosts && !loadPostsLoading ? ref : undefined}
        />
      </>
      {/* // )} */}
    </Container>
  );
};

export default items;
