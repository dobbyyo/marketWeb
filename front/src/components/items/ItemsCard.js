import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ItemImg from './ItemImg';

const Box = styled.div`
  width: 40%;
  height: 30rem;
  background-color: #fff;
  margin-top: 1rem;
  /* display: flex; */
  justify-content: center;
`;

const InfoContainer = styled.div`
  /* background-color: red; */
  /* border: 3px solid #000; */
  height: 24vh;
`;

const Info = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
  padding: 0rem 3rem;
  display: flex;
  justify-content: space-around;
`;

const Description = styled.div`
  padding: 0rem 3rem;
  /* background-color: #111; */
  height: 80%;
  /* color: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const ItemsCard = ({ post }) => {
  return (
    <Box>
      {post.Images[0] && (
        <>
          <Div>
            <ItemImg images={post.Images} />
          </Div>
          <InfoContainer>
            <Info>
              <div>에어팟</div>
              <div>가격 : 1000</div>
            </Info>
            <Description>미개봉입니다.</Description>
          </InfoContainer>
        </>
      )}
    </Box>
  );
};

ItemsCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
export default ItemsCard;
