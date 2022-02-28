import styled from 'styled-components';
import myImg from '../../img/bgimg.jpg';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: #fff; */
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  background-image: url(${myImg.src});
  /* 이 부분 에러 고친거 블로그에 설명예정. */
  width: 100%;
  height: 70%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 2rem;
`;

export const BoxLeft = styled.div`
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

export const Main = styled.div`
  width: 70%;
  margin: 0 auto;
`;
