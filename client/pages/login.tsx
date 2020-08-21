import React from 'react';
import Link from 'next/link';

import App from '../components/App';
import Login from '../components/Forms/Login';

const LoginPage = () => (
  <App>
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

export default LoginPage;
