import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  margin-top: 5rem;
  width: 50%;
  /* height: 80%; */
  background-color: #fff;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;
  .headerIcon {
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .b {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 16rem;
    div {
      margin-bottom: 0.6rem;
    }
  }
  .icon {
    margin-top: 1.2rem;
    width: 10rem;
    height: 10rem;
    background-color: #111;
    border-radius: 10rem;
  }
`;

export const Option = styled.div`
  width: 100%;
  height: 80%;
  button {
    width: 100%;
    border: none;
    margin-top: 1rem;
    height: 2rem;
    background-color: #587;
    border-radius: 1rem;
  }
  input {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 30%;
  /* background-color: red; */
  .userInfo {
    margin-top: 1rem;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    .infoName {
      display: flex;
      justify-content: space-around;
    }
    .infoValue {
      margin-top: 1rem;
      display: flex;
      justify-content: space-around;
    }
  }
  .btn {
    display: flex;
    justify-content: space-evenly;
    button {
      width: 40%;
      height: 4rem;
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 3rem;
      border-radius: 1.2rem;
      &:hover {
        opacity: 0.7;
      }
      &:first-child {
        color: ${(props) => props.theme.white.top};
        background-color: #3a51ff;
        border: none;
      }
      &:last-child {
        color: #3a51ff;
        background-color: initial;
        border: 3px solid #3a51ff;
      }
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0rem;
`;
