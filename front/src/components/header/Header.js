/* eslint-disable no-alert */
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCartShopping,
  faInfinity,
  faSearch,
  faUser,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Router, { useRouter } from 'next/router';
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
  InputOption,
  SmallSearch,
  Menu,
  SmallItems,
  SmallItem,
} from './styled';
import { LOG_OUT_REQUEST } from '../../reducers/user/userAction';

const Header = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { register, handleSubmit, getValues } = useForm();
  const router = useRouter();
  const { category } = router.query;

  const onSubmit = useCallback(() => {
    const { search, type } = getValues();
    if (type === '이름') {
      if (search.length === 0 || search.trim().length === 0) {
        return alert('검색어를 입력해주세요');
      }
      Router.push(`/title/${search}`);
    } else {
      return Router.push(`/hashtag/${search}`);
    }
  }, [getValues]);

  const onLink = useCallback(
    (id) => () => {
      if (id !== category) {
        Router.push(`/category/${id}`);
      }
    },
    [category],
  );

  const onError = (error) => {
    console.log(error);
  };

  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onClickUser = useCallback(() => {
    setUserOpen((pre) => !pre);
  }, [setUserOpen]);
  const onClickSearch = useCallback(() => {
    setSearchOpen((pre) => !pre);
  }, [setSearchOpen]);
  const onClickMenu = useCallback(() => {
    setMenuOpen((pre) => !pre);
  }, [setSearchOpen]);

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
          <button type="button" onClick={onClickMenu}>
            <FontAwesomeIcon icon={faBars} className="menuIcon" />
          </button>
        </Logo>

        <Main>
          <Items>
            <Item>
              <div role="button" onClick={onLink('girl')}>
                {/* onKeyUp eslint 오류 블로그에 설명  */}
                {/* tabIndex 블로그 설명 */}
                여성
              </div>
            </Item>
            <Item>
              <div role="button" onClick={onLink('man')}>
                남자
              </div>
            </Item>
            <Item>
              <div role="button" onClick={onLink('child')}>
                유아
              </div>
            </Item>
            <Item>
              <div role="button" onClick={onLink('all')}>
                공용
              </div>
            </Item>
          </Items>
        </Main>

        <Right>
          <Search onSubmit={handleSubmit(onSubmit, onError)}>
            <Input
              placeholder="검색"
              id="search"
              type="text"
              {...register('search')}
            />
            <InputOption id="type" name="type" {...register('type')}>
              <option value="이름">이름</option>
              <option value="해시태그">해시태그</option>
            </InputOption>

            <FontAwesomeIcon className="searchIcon" icon={faSearch} />
          </Search>

          <IconContainer>
            <FontAwesomeIcon
              className="searchRight"
              icon={faSearch}
              onClick={onClickSearch}
            />
            {me && (
              <Link href="/saved">
                <a>
                  <FontAwesomeIcon className="icon" icon={faCartShopping} />
                  {/* 찜아이콘 */}
                </a>
              </Link>
            )}
            <FontAwesomeIcon
              className="icon"
              icon={faUser}
              onClick={onClickUser}
              style={{ cursor: 'pointer' }}
            />
            {/* 유저 INFO 아이콘 */}
          </IconContainer>
        </Right>
      </Container>

      {menuOpen && (
        <Menu>
          <FontAwesomeIcon
            icon={faX}
            className="backIcon"
            onClick={onClickMenu}
          />
          <SmallItems>
            <SmallItem>
              <div role="button" onClick={onLink('girl')}>
                여성
              </div>
            </SmallItem>
            <SmallItem>
              <div role="button" onClick={onLink('man')}>
                남자
              </div>
            </SmallItem>
            <SmallItem>
              <div role="button" onClick={onLink('child')}>
                유아
              </div>
            </SmallItem>
            <SmallItem>
              <div role="button" onClick={onLink('all')}>
                공용
              </div>
            </SmallItem>
          </SmallItems>
        </Menu>
      )}

      {searchOpen && (
        <SmallSearch>
          <div>
            <FontAwesomeIcon
              icon={faX}
              className="cancelIcon"
              onClick={onClickSearch}
            />
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <input
                placeholder="검색"
                id="search"
                type="text"
                {...register('search')}
              />
              <InputOption
                id="type"
                name="type"
                {...register('type')}
                className="option"
              >
                <option value="이름">이름</option>
                <option value="해시태그">해시태그</option>
              </InputOption>
              <FontAwesomeIcon className="searchIcon" icon={faSearch} />
            </form>
          </div>
        </SmallSearch>
      )}

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
