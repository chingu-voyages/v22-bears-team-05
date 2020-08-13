import React from 'react';
import PropTypes from 'prop-types';
import {ApolloProvider} from '@apollo/client';
import {useApollo} from '../lib/apolloClient';
import 'typeface-montserrat';

/**
 * Root App Component with ApolloProvider Wrapper
 * @param {Object} Component Child Component
 * @param {Object} pageProps Any props
 * @return {Object}
 */
const App = ({Component, pageProps}) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default App;
