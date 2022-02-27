import React from 'react';
import styled from 'styled-components';
import myImg from '../img/bgimg.jpg';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  background-image: url(${myImg.src});
  /* 이 부분 에러 고친거 블로그에 설명예정. */
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 2rem;
`;

const BoxLeft = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div:first-child {
    width: 100%;
    h1 {
      line-height: 5rem;
      font-size: 4rem;
      margin-bottom: 3rem;
    }
  }
  div:nth-child(2) {
    width: 100%;
    p {
      line-height: 2rem;
      font-size: 1rem;
      font-weight: lighter;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const Main = styled.div`
  height: 50vh;
  background-color: #fff;
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <BoxLeft>
          <div>
            <h1>
              We Always <br /> Provide <br /> Best Services
            </h1>
          </div>
          <div>
            <p>
              We are always doing our best for the best <br /> quality and
              customer satisfaction. <br />
              We respond immediately to customer feedback.
            </p>
          </div>
        </BoxLeft>
      </Header>
      <Main>a</Main>
    </Container>
  );
};

export default Home;
