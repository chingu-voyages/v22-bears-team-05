import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-montserrat';
import styled from 'styled-components';

import GlobalStyle from '../theme/globalStyles';

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const App = ({ Component, pageProps }) => (
  <Container>
    <GlobalStyle />
    <Component {...pageProps} />
  </Container>
);

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default App;
