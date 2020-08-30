import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import NextLink from 'next/link';

import { ME_QUERY } from '../utils/graphql/query';

/* eslint jsx-a11y/anchor-is-valid: 0 */

const NavBar: FunctionComponent = () => {
  const { data, loading, error } = useQuery(ME_QUERY);
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
        <p>{`Logged in as ${data.me.email}`}</p>
      </ul>
    );
  }

  return body;
};

export default NavBar;
