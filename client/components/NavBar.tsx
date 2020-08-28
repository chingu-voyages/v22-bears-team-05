import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import NextLink from 'next/link';

import { ME_QUERY } from '../utils/graphql/query';

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
          <NextLink href="/">Landing</NextLink>
        </li>
        <li>
          <NextLink href="/login">Login</NextLink>
        </li>
        <li>
          <NextLink href="/register">Register</NextLink>
        </li>
      </ul>
    );

    // User is authenticated
  } else {
    body = (
      <ul>
        <li>
          <NextLink href="/home">App Home</NextLink>
        </li>
        <p>{`Logged in as ${data.me.email}`}</p>
      </ul>
    );
  }

  return body;
};

export default NavBar;
