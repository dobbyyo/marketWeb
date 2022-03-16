import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PostImages from './PostImages';

const Box = styled.div`
  width: 100%;
  height: 20rem;
  justify-content: center;
  align-items: center;
`;

const PostCard = ({ post }) => {
  return (
    <Box>
      {post.Images[0] && (
        <>
          <PostImages images={post.Images} />
        </>
      )}
      <div>{post.title}</div>
    </Box>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
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
