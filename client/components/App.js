import React from 'react';
import PropTypes from 'prop-types';

import Header from './Layout/Header';

const App = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
