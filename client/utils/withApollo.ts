import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { PaginatedPosts } from "../generated/graphql";
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

let serverUri = 'http://localhost:5000/graphql';
if (process.env.NODE_ENV === 'production') {
  serverUri = 'https://chingu-v22-bears05.herokuapp.com/graphql';
}

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: serverUri,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache(),
  });

// eslint-disable-next-line import/prefer-default-export
export const withApollo = createWithApollo(createClient);
