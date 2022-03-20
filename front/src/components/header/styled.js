import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  font-size: 1rem;
  height: 4rem;
  background-color: ${(props) => props.theme.black.top};
  color: ${(props) => props.theme.white.top};
  z-index: 999;
  position: fixed;
`;
export const Logo = styled(motion.div)`
  width: 20%;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  a {
    margin-right: 1rem;
  }
  button {
    background-color: initial;
    border: none;
    font-size: 1.4rem;
  }
  .menuIcon {
    cursor: pointer;
    background-color: #fff;
  }
`;

// 메인
export const Main = styled(motion.div)`
  width: 40%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const Items = styled.ul`
  width: 100%;
  display: flex;
`;
export const Item = styled.li`
  margin-right: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  &:hover {
    color: ${(props) => props.theme.white.row};
  }
`;

//  검색
export const Right = styled(motion.div)`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: end;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  height: 70%;
  border: 1px solid #f2f2f2;
  width: 15rem;
  .searchIcon {
    position: absolute;
    left: 5px;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const Input = styled(motion.input)`
  height: 80%;
  border: none;
  background-color: initial;
  position: absolute;
  right: 50px;
  color: #fff;
`;
export const InputOption = styled(motion.select)`
  height: 100%;
  width: 5rem;
  position: absolute;
  left: -6rem;
  background-color: initial;
  color: #fff;
  border: none;
  font-size: 1rem;
  text-align: center;
  @media screen and (max-width: 768px) {
    color: #000;
    position: absolute;
    left: 85%;
    appearance: none; /* 화살표 없애기 공통*/
    /* border: 1px solid #000; */
    width: 3.8rem;
    text-align: center;
  }
`;

export const IconContainer = styled(motion.div)`
  margin-left: 3rem;
  font-size: 1.5rem;
  display: flex;
  a {
    margin: 0 2rem;
  }
  .searchRight {
    display: none;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    .searchRight {
      display: flex;
      margin-right: 2rem;
    }
  }
`;

export const User = styled(motion.div)`
  width: 20rem;
  height: 20rem;
  background-color: #fff;
  z-index: 999;
  position: fixed;
  right: 3rem;
  top: 0.5rem;
  padding: 1rem 1rem;
  .header {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    .exit {
      font-size: 1.2rem;
      color: ${(props) => props.theme.black.top};
      cursor: pointer;
    }
  }
  .menu {
    li {
      padding-bottom: 1rem;
      padding-top: 0.5rem;
      border-bottom: 1px solid #000;
      cursor: pointer;
    }
  }
  .btn {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    button {
      cursor: pointer;
      margin-bottom: 1rem;
      height: 3.5rem;
      width: 100%;
      &:first-child {
        background-color: #ae946d;
        border: none;
        color: ${(props) => props.theme.white.top};
        font-size: 1.2rem;
        border-radius: 0.3rem;
        &:hover {
          color: ${(props) => props.theme.black.top};
          background-color: rgba(174, 148, 109, 0.9);
        }
      }
      &:last-child {
        border: none;
        background-color: inherit;
        color: ${(props) => props.theme.black.top};
        font-size: 0.9rem;
        border-bottom: 1px solid #111;
        &:hover {
          color: ${(props) => props.theme.black.row};
          border: 1px solid #111;
        }
      }
    }
    a {
      padding: 1rem 6rem;
    }
  }
`;
export const SmallSearch = styled.div`
  background-color: ${(props) => props.theme.white.top};
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 999;

  div {
    width: 100%;
    height: 10rem;
    background-color: ${(props) => props.theme.white.row};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  form {
    width: 80%;
    /* background-color: red; */
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.white.top};
    position: relative;
    border: 3px solid #f2f2f2;
  }
  input {
    width: 80%;
    height: 3.2rem;
    border: none;
  }
  .searchIcon {
    cursor: pointer;
    position: absolute;
    left: 1rem;
    font-size: 1.5rem;
  }
  .cancelIcon {
    cursor: pointer;
    position: relative;
    top: -3rem;
    left: -2rem;
    font-size: 1.5rem;
  }
`;

export const Menu = styled.div`
  position: fixed;
  z-index: 999;
  width: 15rem;
  height: 15rem;
  background-color: ${(props) => props.theme.white.top};
  .backIcon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
export const SmallItems = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const SmallItem = styled.div`
  width: 100%;
  text-align: center;
  a {
    &:hover {
      opacity: 0.5;
    }
  }
`;
