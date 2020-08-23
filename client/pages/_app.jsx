import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-montserrat';

import GlobalStyle from '../theme/globalStyles';

/**
 * Root App Component
 */
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
