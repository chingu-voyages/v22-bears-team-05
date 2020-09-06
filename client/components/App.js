import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Layout/Header';

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const App = ({ children }) => (
  <Container>
    <Header />
    <main>{children}</main>
  </Container>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
