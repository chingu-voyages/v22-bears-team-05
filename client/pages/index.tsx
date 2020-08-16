import React, { FunctionComponent } from 'react';
import App from '../components/App';
// import { initializeApollo } from "../lib/apolloClient"

import Links from '../components/Links';

const IndexPage: FunctionComponent = () => (
  <App>
    <Links />
    <h1>Landing Page</h1>
  </App>
);

/*
fill out getStaticProps properly once the graphQL stuff is figured out

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}
*/
export default IndexPage;
