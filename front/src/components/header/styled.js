import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  font-size: 1.5rem;
  height: 4rem;
  border-bottom: 1px solid #111;
`;
export const Logo = styled.div`
  width: 30%;
  display: flex;
  a {
    display: flex;
  }
  h2 {
    margin-left: 1rem;
  }
`;

export const Menu = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    li {
      padding: 0 0.5rem;
    }
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    display: ${(props) => (props.isToggled ? 'flex' : 'none')};
  }
`;

export const User = styled.div`
  width: 30%;
  /* height: 100%; */
  display: flex;
  justify-content: right;
  /* text-align: center; */
  align-items: center;

  div {
    padding: 0 0.5rem;
    &:last-child {
      display: flex;
      align-items: center;
      border-radius: 4rem;
      color: #fff;
      background-color: #111;
      height: 3rem;
    }
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    display: ${(props) => (props.isToggled ? 'flex' : 'none')};
  }
`;

export const Toggled = styled.div`
  /* color: white; */
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: ${(props) => (props.isToggled ? 'flex' : 'none')};
  }
`;
