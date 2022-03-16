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
`;
export const Logo = styled(motion.div)`
  width: 10%;
  display: flex;
  align-items: center;
`;

// 메인
export const Main = styled(motion.div)`
  width: 45%;
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
  width: 45%;
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
  }
  @media screen and (max-width: 768px) {
    .searchRight {
      display: flex;
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
  /* display: flex; */
  background-color: ${(props) => props.theme.white.top};
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  /* justify-content: center; */
  form {
    width: 100%;
    height: 7rem;
    background-color: ${(props) => props.theme.white.row};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 80%;
    height: 3.2rem;
    background-color: red;
  }
  .a {
    background-color: blue;
    width: 10%;
    height: 3rem;
    position: absolute;
    left: 0rem;
    right: 0;
  }
  .searchIcon {
    position: absolute;
    left: 12%;
    font-size: 1.5rem;
  }
`;

// export const Menu = styled.div`
//   width: 30%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ul {
//     display: flex;
//     li {
//       padding: 0 0.5rem;
//     }
//     .uploadItem {
//       background-color: black;
//       border-radius: 5rem;
//       color: #fff;
//       /* padding: 1rem 0; */
//       cursor: pointer;
//     }
//   }
//   @media screen and (max-width: 768px) {
//     flex-wrap: wrap;
//     display: ${(props) => (props.isToggled ? 'flex' : 'none')};
//   }
// `;

// export const User = styled.div`
//   width: 30%;
//   /* height: 100%; */
//   display: flex;
//   justify-content: right;
//   /* text-align: center; */
//   align-items: center;

//   div {
//     padding: 0 0.5rem;
//     &:last-child {
//       display: flex;
//       align-items: center;
//       border-radius: 4rem;
//       color: #fff;
//       background-color: #111;
//       height: 3rem;
//     }
//   }
//   @media screen and (max-width: 768px) {
//     flex-wrap: wrap;
//     display: ${(props) => (props.isToggled ? 'flex' : 'none')};
//   }
// `;

// export const Toggled = styled.div`
//   /* color: white; */
//   cursor: pointer;
//   @media screen and (min-width: 768px) {
//     display: ${(props) => (props.isToggled ? 'flex' : 'none')};
//   }
// `;
