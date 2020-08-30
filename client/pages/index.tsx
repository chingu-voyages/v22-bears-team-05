import React, { FunctionComponent } from 'react';
import App from '../components/App';
import Head from 'next/head';

import { withApollo } from '../utils/withApollo';

// import { initializeApollo } from "../lib/apolloClient"

const IndexPage: FunctionComponent = () => (
  <App>
    <Head>
      <title>Goal Tracker</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <h1>Goal Tracker</h1>
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
export default withApollo({ ssr: false })(IndexPage);
