import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useQuery } from '@apollo/client';

import { withApollo } from '../utils/withApollo';
import App from '../components/App';
import Login from '../components/Forms/Login';
import { ME_QUERY } from '../utils/graphql/query';

const LoginPage = () => {
  const { data } = useQuery(ME_QUERY);

  if (data?.me) {
    window.location.pathname = '/home';
  }

  return (
    <App>
      <Head>
        <title>Goal Tracker | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1>Login</h1>
      <Login />
      <p className="center">
        {'Not a member? '}
        <Link href="/register">
          <a href="/register">Create Account!</a>
        </Link>
      </p>
    </App>
  );
};

export default withApollo({ ssr: false })(LoginPage);
