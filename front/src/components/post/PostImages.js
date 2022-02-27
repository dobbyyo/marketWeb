import React from 'react';
import PropTypes from 'prop-types';

const PostImages = ({ images }) => {
  if (images.length === 1) {
    return (
      <>
        <img src={images[0].src} alt={images[0].src} width="50%" />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img src={images[0].src} alt={images[0].src} width="50%" />
        <img src={images[1].src} alt={images[1].src} width="50%" />
      </>
    );
  }
  if (images.length === 3) {
    return (
      <>
        <img src={images[0].src} alt={images[0].src} width="50%" />
        <img src={images[1].src} alt={images[1].src} width="50%" />
        <img src={images[2].src} alt={images[2].src} width="50%" />
      </>
    );
  }

  return (
    <div>
      <img src={images[0].src} alt={images[0].src} width="50%" />
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
