import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PostImages from './PostImages';

const Box = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  padding-top: 2rem;
`;

const PostCard = ({ post }) => {
  return <Box>{post.Images[0] && <PostImages images={post.Images} />}</Box>;
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
