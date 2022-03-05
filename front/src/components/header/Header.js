import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faInfinity,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAnimation } from 'framer-motion';

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
} from './styled';

const Header = () => {
  const inputAnimation = useAnimation();
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  console.log(router);
  console.log(router.pathname);

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
    console.log(data);
    // Router.push(`/search?keyword=${data.keyword}`);
  };

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((cur) => !cur);
  };

  return (
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
          <Item>스포츠</Item>
          <Item>세일</Item>
        </Items>
      </Main>

      <Right>
        <Search onSubmit={handleSubmit(onValid)}>
          <Input placeholder="검색어를 작성해주세요" />
          <FontAwesomeIcon className="searchIcon" icon={faSearch} />
        </Search>
        <IconContainer>
          <FontAwesomeIcon className="icon" icon={faUser} />
          <FontAwesomeIcon className="icon" icon={faCartShopping} />
        </IconContainer>
      </Right>
    </Container>
  );
};

export default Header;
