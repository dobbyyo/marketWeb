import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faInfinity,
  faSearch,
  faUser,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Input,
  Item,
  Items,
  Logo,
  Main,
  Right,
  Search,
  Check,
  IconContainer,
  User,
} from './styled';
import { LOG_OUT_REQUEST } from '../../reducers/user/userAction';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  let homeMatch, girlMatch, manMatch, sportMatch, saleMatch;

  switch (router.pathname) {
    case '/':
      homeMatch = true;
      break;
    case '/aside':
      girlMatch = true;
      break;
    case '/man':
      manMatch = true;
      break;
    case '/sport':
      sportMatch = true;
      break;
    case '/sale':
      saleMatch = true;
    default:
      break;
  }

  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    // console.log(data);
    // Router.push(`/search?keyword=${data.keyword}`);
  };

  const [userOpen, setUserOpen] = useState(false);

  const onClickUser = useCallback(() => {
    setUserOpen((pre) => !pre);
  }, [setUserOpen]);

  const onLogOutClick = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    onClickUser();
  }, []);

  return (
    <>
      <Container>
        <Logo>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faInfinity} />
            </a>
          </Link>
        </Logo>

        <Main>
          <Items>
            <Item>
              <Link href="/aside">
                <a>여성{girlMatch && <Check layoutId="circle" />}</a>
              </Link>
            </Item>
            <Item>남성</Item>
            <Item>아동</Item>
            <Item>공동</Item>
          </Items>
        </Main>

        <Right>
          <Search onSubmit={handleSubmit(onValid)}>
            <Input placeholder="검색어를 작성해주세요" />
            <FontAwesomeIcon className="searchIcon" icon={faSearch} />
          </Search>
          <IconContainer>
            <FontAwesomeIcon className="icon" icon={faCartShopping} />
            <FontAwesomeIcon
              className="icon"
              icon={faUser}
              onClick={onClickUser}
            />
          </IconContainer>
        </Right>
      </Container>

      {userOpen && (
        <User>
          <div className="header">
            메뉴
            <FontAwesomeIcon
              icon={faX}
              className="exit"
              onClick={onClickUser}
            />
          </div>
          <ul className="menu">
            <li>마이페이지</li>
            <li>위시리스트</li>
            <li>고객지원</li>
          </ul>
          {me ? (
            <div className="btn">
              <button type="button">
                <Link href="/write">
                  <a>글 올리기</a>
                </Link>
              </button>
              <button type="button">
                <a role="presentation" onClick={onLogOutClick}>
                  로그아웃
                </a>
              </button>
            </div>
          ) : (
            <div className="btn">
              <button type="button">
                <Link href="/login">
                  <a>로그인</a>
                </Link>
              </button>
              <button type="button">
                <Link href="/signup">
                  <a>회원가입</a>
                </Link>
              </button>
            </div>
          )}
        </User>
      )}
    </>
  );
};

export default Header;
