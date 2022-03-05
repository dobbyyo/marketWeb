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
  /* background-color: red; */
`;
export const Main = styled(motion.div)`
  width: 45%;
  display: flex;
  align-items: center;
`;
export const Right = styled(motion.div)`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: end;
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
export const Check = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
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
`;
export const Input = styled(motion.input)`
  height: 80%;
  border: none;
  /* width: 15rem; */
  /* background-color: ${(props) => props.theme.black.row}; */
  background-color: initial;
  position: absolute;
  right: 50px;
  color: #fff;
`;
export const IconContainer = styled(motion.div)`
  margin-left: 3rem;
  font-size: 1.5rem;
  /* background-color: red; */
  display: flex;
  .icon {
    margin-right: 2rem;
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
