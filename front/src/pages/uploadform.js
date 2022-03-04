import React from 'react';
import styled from 'styled-components';

import PostForm from '../components/post/PostForm';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const post = () => {
  return (
    <Container>
      <PostForm />
    </Container>
  );
};

export default post;
