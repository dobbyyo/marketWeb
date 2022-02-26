import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShop } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  font-size: 1.5rem;
  height: 4rem;
  border-bottom: 1px solid #111;
`;
const Logo = styled.div`
  width: 30%;
  display: flex;
  a {
    display: flex;
  }
  h2 {
    margin-left: 1rem;
  }
`;

const Menu = styled.div`
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

const User = styled.div`
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

const Toggled = styled.div`
  /* color: white; */
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: ${(props) => (props.isToggled ? 'flex' : 'none')};
  }
`;

const Header = () => {
  const [isToggled, isSetToggled] = useState(false);

  const toggledHandler = () => {
    isSetToggled((pre) => !pre);
  };

  return (
    <Container isToggled={isToggled}>
      {/* 로고 */}
      <Logo>
        <Link href="/">
          <a>
            <FontAwesomeIcon icon={faShop} />
            <h2>항상마켓</h2>
          </a>
        </Link>
      </Logo>
      {/* 토글 */}

      <Toggled onclick={toggledHandler}>
        <Link href="/aside">
          <a>
            <FontAwesomeIcon icon={faBars} />
          </a>
        </Link>
      </Toggled>

      {/* 메뉴 */}
      <Menu>
        <ul>
          <li>물건</li>
          <li>문의</li>
        </ul>
      </Menu>
      {/* user */}
      <User>
        <div>
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </div>
        <div>
          <Link href="/join">
            <a>회원가입</a>
          </Link>
        </div>
      </User>
    </Container>
  );
};

export default Header;
