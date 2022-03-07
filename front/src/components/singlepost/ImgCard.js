import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  width: 90%;
  height: 20rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const ImgCard = ({ images }) => {
  return (
    <>
      <Img
        src={`http://localhost:3100/${images[0].src}`}
        alt={`http://localhost:3100/${images[0].src}`}
      />
    </>
  );
};

ImgCard.protoTypes = {
  images: PropTypes.shape({
    src: PropTypes.string,
  }).isRequired,
};

export default ImgCard;
