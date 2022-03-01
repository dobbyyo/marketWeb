import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Boximg from './Boximg';

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
`;
const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const BoxCard = ({ data }) => {
  return (
    <Box>
      {data.img[0] && <Boximg images={data.img} />}
      {data.name[0] && <Name>{data.name}</Name>}
    </Box>
  );
};

BoxCard.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default BoxCard;
