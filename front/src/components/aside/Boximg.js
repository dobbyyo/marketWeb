import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 5rem;
  background-position: center center;
  display: flex;
  margin: 0 auto;
  /* background-color: red; */
`;

const Boximg = ({ images }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <Img src={images} alt={images} />
    </div>
  );
};

Boximg.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
    }),
  ).isRequired,
};

export default Boximg;
