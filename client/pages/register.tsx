import React from 'react';
import Link from 'next/link';

import App from '../components/App';
import Register from '../components/Forms/Register';

const LoginPage = () => (
  <App>
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
