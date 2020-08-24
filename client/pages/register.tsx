import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import App from '../components/App';
import Register from '../components/Forms/Register';

const LoginPage = () => (
  <App>
    <Head>
      <title>Goal Tracker | Register</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <h1>Register</h1>
    <Register />
    <p className="center">
      {'Already a member? '}
      <Link href="/login">
        <a href="/login">Sign In!</a>
      </Link>
    </p>
  </App>
);

export default LoginPage;
