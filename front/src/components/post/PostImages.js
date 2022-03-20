import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  width: 30rem;
`;

const PostImages = ({ images }) => {
  return (
    <div>
      <Img src={images[0].src} alt={images[0].src} />
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default PostImages;
