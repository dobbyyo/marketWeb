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
  const { mainPosts, morePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    if (inView && morePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;

      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
      });
    }
  }, [inView, morePosts, loadPostsLoading, mainPosts]);

  // useEffect(() => {
  //   function onScroll() {
  //     console.log(mainPosts[mainPosts.length - 1].id);
  //     // console.log(
  //     //   window.scrollY, // 얼마나 내렸는지
  //     //   document.documentElement.clientHeight, // 화면에 보이는 높이
  //     //   document.documentElement.scrollHeight, // 총 길이
  //     // );
  //     // 3208 849 5024
  //     if (
  //       window.scrollY + document.documentElement.clientHeight >
  //       document.documentElement.scrollHeight - 300
  //     ) {
  //       if (morePosts && !loadPostsLoading) {
  //         dispatch({
  //           type: LOAD_POSTS_REQUEST,
  //           data: mainPosts[mainPosts.length - 1].id,
  //         });
  //       }
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, [mainPosts, morePosts, loadPostsLoading]);

  return (
    <Container>
      {mainPosts.map((v) => (
        <ItemsCard key={v.id} post={v} />
      ))}
      <div
        style={{ height: '2rem' }}
        ref={morePosts && !loadPostsLoading ? ref : undefined}
      />
    </Container>
  );
};

export default items;
