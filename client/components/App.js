import React from 'react';
import PropTypes from 'prop-types';

import Links from './Links.tsx';

const App = ({ children }) => (
  <main>
    <Links />
    {children}
  </main>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
