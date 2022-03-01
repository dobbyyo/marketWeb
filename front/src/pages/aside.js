import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import faker from 'faker';
import BoxCard from '../components/aside/BoxCard';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;
const Header = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 20%;
  div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
`;

const Main = styled.div`
  width: 100%;
  height: 80%;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  grid-gap: 1rem;
  cursor: pointer;
`;

const Footer = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;

  .arrowIcon {
    margin: 1rem 2rem;
    font-size: 3rem;
    cursor: pointer;
  }
`;

const Aside = () => {
  const { me } = useSelector((state) => state.user);
  const fakerData = (n) =>
    Array(n)
      .fill()
      .map(() => ({
        name: faker.random.word(),
        img: faker.image.image(),
      }));

  const faData = fakerData(6);

  return (
    <Container>
      <Header>
        <div>{me ? <div>me.nicknmae</div> : <div>비회원</div>}</div>
      </Header>
      <Main>
        {faData.map((v) => (
          <BoxCard key={v.name} data={v} />
        ))}
      </Main>
      <Footer>
        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrowIcon" />
        <FontAwesomeIcon icon={faCircleArrowRight} className="arrowIcon" />
      </Footer>
    </Container>
  );
};

export default Aside;
