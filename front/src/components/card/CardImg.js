import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  height: 20rem;
`;

const CardImg = ({ images }) => {
  return (
    <>
      <Img
        src={`http://localhost:3100/${images[0].src}`}
        alt={`http://localhost:3100/${images[0].src}`}
      />
    </>
  );
};

CardImg.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default CardImg;
