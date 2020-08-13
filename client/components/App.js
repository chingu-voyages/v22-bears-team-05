import React from 'react';
import PropTypes from 'prop-types';

const App = ({children}) => {
  return <main>{children}</main>;
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
