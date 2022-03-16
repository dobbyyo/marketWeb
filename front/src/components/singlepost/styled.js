import styled from 'styled-components';

export const BoxContainer = styled.div`
  width: 50%;
  background-color: ${(props) => props.theme.white.top};
  color: ${(props) => props.theme.black.top};
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Header = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  font-size: 1.4rem;
  border-bottom: 2px solid #000;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
  position: relative;
  .header__left {
    width: 33%;
    display: flex;
    div {
      margin-left: 1rem;
    }
  }
  .middle {
    width: 33%;
    display: flex;
    justify-content: center;
  }
  .header__right {
    width: 33%;
    display: flex;
    justify-content: end;
  }
`;
export const Info = styled.div`
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
    align-items: center;
    .commentBtn {
      width: 5rem;
      height: 2rem;
      background-color: ${(props) => props.theme.red};
      border: none;
      border-radius: 0.5rem;
      color: ${(props) => props.theme.white.top};
      font-size: 1.1rem;
      font-weight: bold;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      margin-right: 0.2rem;
      width: 5rem;
      height: 2rem;
      background-color: ${(props) => props.theme.red};
      border: none;
      border-radius: 0.5rem;
      color: ${(props) => props.theme.white.top};
      &:hover {
        opacity: 0.8;
      }
      .icon {
        margin-right: 0.5rem;
      }
    }
  }
`;

export const Img = styled.img`
  width: 90%;
  height: 20rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

export const Option = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 1rem 1rem 0 0;
  button {
    border: none;
    background-color: ${(props) => props.theme.red};
    border-radius: 0.5rem;
    color: #fff;
    height: 2.2rem;
    width: 6rem;
    &:hover {
      opacity: 0.7;
    }
  }
`;
