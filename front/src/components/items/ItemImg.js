import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Img = styled.img`
  width: 100%;
  /* margin-top: 2rem; */
`;

const ItemImg = ({ images }) => {
  return (
    <div>
      <Img src={images[0].src} alt={images[0].src} />
    </div>
  );
};

ItemImg.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};
export default ItemImg;
