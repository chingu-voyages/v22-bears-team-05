import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { PaginatedPosts } from "../generated/graphql";
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:5000/graphql',
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
