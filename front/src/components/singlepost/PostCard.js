import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';

import ImgCard from './ImgCard';
import noImg from '../../img/noimg.png';

const BoxContainer = styled.div`
  width: 50%;
  height: 40rem;
  background-color: ${(props) => props.theme.white.top};
  color: ${(props) => props.theme.black.top};
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  font-size: 1.4rem;
  border-bottom: 2px solid #000;
  align-items: center;
  padding: 0 2rem;
  .header__left {
    width: 50%;
    display: flex;
    div {
      margin-left: 1rem;
    }
  }
  .header__right {
    width: 50%;
    display: flex;
    justify-content: end;
  }
`;
const Info = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 0 2rem;
  .main {
    margin-top: 1rem;
    width: 100%;
    height: 10rem;
    border: 1px solid #000;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    border-top: 2px solid #000;
    padding: 1rem 0;
  }
`;

const Img = styled.img`
  width: 90%;
  height: 20rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const PostCard = ({ post }) => {
  const onClickBack = () => {
    Router.push('/girl');
  };
  return (
    <BoxContainer>
      {post && (
        <>
          <Header>
            <div className="header__left">
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                onClick={onClickBack}
                style={{ cursor: 'pointer' }}
              />
              <div>{post.User.nickname}</div>
            </div>
            <div className="header__right">제목: {post.title}</div>
          </Header>
          {post.Images[0] ? (
            <ImgCard images={post.Images} />
          ) : (
            <Img src={noImg.src} alt="img" />
          )}
          <Info>
            <div>가격: {post.price}</div>
            <div className="main">{post.content}</div>
            <div className="footer">
              <div>종류: {post.clothes}</div>
              <div>성별: {post.people}</div>
            </div>
          </Info>
        </>
      )}
    </BoxContainer>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    Comment: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    UserId: PropTypes.number,
    clothes: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    people: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default PostCard;
