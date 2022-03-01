import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  width: 30rem;
`;

const PostImages = ({ images }) => {
  // if (images.length === 1) {
  //   return (
  //     <>
  //       <img src={images[0].src} alt={images[0].src} />
  //     </>
  //   );
  // }
  // if (images.length === 2) {
  //   return (
  //     <>
  //       <img src={images[0].src} alt={images[0].src} />
  //       <img src={images[1].src} alt={images[1].src} />
  //     </>
  //   );
  // }
  // if (images.length === 3) {
  //   return (
  //     <>
  //       <img src={images[0].src} alt={images[0].src} />
  //       <img src={images[1].src} alt={images[1].src} />
  //       <img src={images[2].src} alt={images[2].src} />
  //     </>
  //   );
  // }

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
