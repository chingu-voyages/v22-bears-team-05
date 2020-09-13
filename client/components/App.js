import React from 'react';
import PropTypes from 'prop-types';

import Header from './Layout/Header';
import Footer from './Layout/Footer';

const App = ({ children, isApp = false }) => (
  <>
    <Header />
    {isApp && <main style={{ margin: '1rem 1rem' }}>{children}</main>}
    {!isApp && <main>{children}</main>}
    <Footer />
  </>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
