import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset } from 'styled-reset';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Header from '../components/header/Header';
import wrapper from '../store/configureStore';
import theme from '../theme/theme';

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
  ol, ul {
    list-style: none;
  }
  body{
    @font-face {
      font-family: 'SANJUGotgam';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANJUGotgam.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    font-family: "SANJUGotgam";
    background-color: #E3E3DB;
  }
`;

const MotionDiv = styled(motion.div)``;

const animationVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const DobbyMount = ({ Component }) => {
  const router = useRouter();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AnimatePresence exitBeforeEnter>
          <MotionDiv
            key={router.route}
            variants={animationVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: 'linear' }}
          >
            <Head>
              <title>Dobby</title>
            </Head>
            <GlobalStyle />
            <Header />
            <Component />
          </MotionDiv>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
};
DobbyMount.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  // console.log(metric);
}

export default wrapper.withRedux(DobbyMount);
