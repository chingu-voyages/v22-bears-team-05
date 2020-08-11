import React from 'react';
import App from '../components/App';
// import { initializeApollo } from "../lib/apolloClient"

const IndexPage = () => <App>Boilerplate Code</App>;

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
