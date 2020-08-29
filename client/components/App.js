import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

const App = ({ children }) => (
  <main>
    <NavBar />
    {children}
  </main>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
