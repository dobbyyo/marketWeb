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
import Router from 'next/router';
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
  IconContainer,
  User,
} from './styled';
import { LOG_OUT_REQUEST } from '../../reducers/user/userAction';

const Header = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = useCallback(() => {
    const { search } = getValues();
    if (search.length === 0 || search.trim().length === 0) {
      return alert('검색어를 입력해주세요');
    }
    return Router.push(`/title/${search}`);
  }, [getValues]);

  const onError = (error) => {
    console.log(error);
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
    Router.push('/');
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
              <Link href="/girl">
                <a>여성</a>
              </Link>
            </Item>
            <Item>
              <Link href="/man">
                <a>남성</a>
              </Link>
            </Item>
            <Item>
              <Link href="/child">
                <a>아동</a>
              </Link>
            </Item>
            <Item>
              <Link href="/all">
                <a>공용</a>
              </Link>
            </Item>
          </Items>
        </Main>

        <Right>
          <Search onSubmit={handleSubmit(onSubmit, onError)}>
            <Input
              placeholder="검색어를 작성해주세요"
              id="search"
              type="text"
              {...register('search')}
            />
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
            {me && (
              <>
                <li>
                  <Link href={`/user/${me.id}`}>
                    <a>마이페이지</a>
                  </Link>
                </li>
              </>
            )}
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
