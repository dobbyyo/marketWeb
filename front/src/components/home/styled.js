import styled from 'styled-components';
import boyImg from '../../img/a.jpg';
import girlImg from '../../img/c.jpg';

export const Container = styled.div`
  width: 100%;
`;
export const Header = styled.div`
  background-image: url(${boyImg.src});
  /* 이 부분 에러 고친거 블로그에 설명예정. */
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: left left; */
  padding: 0 2rem;
  position: relative;
`;

export const Box = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  div {
    p {
      line-height: 2rem;
      font-size: 1rem;
      font-weight: lighter;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const ManMain = styled.div`
  position: absolute;
  width: 80%;
  bottom: 1;
  left: 10%;
`;
export const Btn = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  /* text-align: center; */
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  button {
    width: 200px;
    height: 80%;
    font-size: 1.4rem;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    border: none;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.black.top};
    color: ${(props) => props.theme.white.top};
    &:hover {
      background-color: ${(props) => props.theme.black.row};
    }
  }
`;

export const Bottom = styled.div`
  background-image: url(${girlImg.src});
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0 2rem;
  position: relative;
`;

export const GirlMain = styled.div`
  position: absolute;
  width: 80%;
  bottom: 1;
  left: 10%;
`;
