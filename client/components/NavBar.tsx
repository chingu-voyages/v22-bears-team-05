import React, { FunctionComponent } from 'react';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ME_QUERY } from '../utils/graphql/query';
import { LOGOUT_MUTATION } from '../utils/graphql/mutation';
import Spinner from './Spinner';

/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */

const NavBar: FunctionComponent = () => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { data, loading, error } = useQuery(ME_QUERY);
  const [logout] = useMutation(LOGOUT_MUTATION);
  let body = null;

  // Data is loading
  if (loading) {
    // User is not authenticated
  } else if (!data?.me) {
    body = (
      <ul>
        <li>
          <NextLink href="/">
            <a>Landing</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/login">
            <a>Login</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/register">
            <a>Register</a>
          </NextLink>
        </li>
      </ul>
    );

    // User is authenticated
  } else {
    body = (
      <ul>
        <li>
          <a href="/home">App Home</a>
        </li>
        <li>
          {`Signed in as ${data.me.email} `}
          <a
            href=""
            onClick={async (e) => {
              e.preventDefault();
              await logout();
              await apolloClient.clearStore();
              router.push('/login');
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    );
  }

  return body;
};

export default NavBar;
