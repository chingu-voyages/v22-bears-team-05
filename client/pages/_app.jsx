import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-montserrat';

import GlobalStyle from '../theme/globalStyles';

const App = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default App;
