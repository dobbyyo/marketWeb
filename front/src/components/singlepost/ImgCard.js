import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Img = styled.img`
  width: 90%;
  height: 20rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;
const Container = styled.div`
  width: 90%;
`;

const ImgCard = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Container>
        <Slider {...settings}>
          {images.map((img, i) => (
            <Img key={img.id} src={`http://localhost:3100/${images[i].src}`} />
          ))}
        </Slider>
      </Container>
    </>
  );
};

ImgCard.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default ImgCard;
