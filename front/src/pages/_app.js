import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

import wrapper from '../store/configureStore';
// import Header from '../components/header/Header';

const GlobalStyle = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
    /* outline: none; */
    /* text-decoration: none; */
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  body{
    @font-face {
      font-family: 'SANJUGotgam';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANJUGotgam.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    font-family: "SANJUGotgam";
    background-color: #E7E7E7;
  }

`;

const DobbyMount = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Dobby</title>
      </Head>

      <GlobalStyle />
      <Component />
    </>
  );
};
DobbyMount.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(DobbyMount);
