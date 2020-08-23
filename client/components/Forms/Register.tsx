import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { initializeApollo } from '../../lib/apolloClient';
import Spinner from '../Spinner';
import LOGIN_QUERY from './loginQuery';
import LOGIN_VARIABLES from './loginVariables';

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const LOGIN_ERRORS = {
  loginFail: 'Email or password is incorrect',
  emptyEmail: 'Enter your email',
  emptyPassword: 'Enter your password',
  emptyFields: 'Invalid Login',
};

const SUCCESS_LABEL = {
  login: 'Success! Redirecting...',
};

type LoginInput = {
  email: string;
  password: string;
};

const initState: LoginInput = {
  email: '',
  password: '',
};

const Login: FunctionComponent = () => {
  const [formInput, setFormInput] = useState(initState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectable, setSelectable] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const { email, password } = formInput;

    // Get error if necessary (for empty fields)
    const getLoginError = (emailInput: string, passwordInput: string) => {
      if (!emailInput) {
        if (!passwordInput) {
          return LOGIN_ERRORS.emptyFields;
        }
        return LOGIN_ERRORS.emptyEmail;
      }

      if (!passwordInput) {
        return LOGIN_ERRORS.emptyPassword;
      }
      return null;
    };

    const errorMessage = getLoginError(email, password);
    setError(errorMessage);

    if (errorMessage) {
      return false;
    }

    setSelectable(false);
    setLoading(true);

    const apolloClient = await initializeApollo();

    try {
      await apolloClient.resetStore();
      await apolloClient.query({
        query: LOGIN_QUERY,
        variables: LOGIN_VARIABLES({ email, password }),
      });
      setSuccess(true);
      router.push('/home');
      return true;
    } catch {
      setSelectable(true);
      setLoading(false);
      setError(LOGIN_ERRORS.loginFail);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const getResponse = () => {
    if (error) {
      return <p className="error">{error}</p>;
    }

    if (success) {
      return <p className="success">{SUCCESS_LABEL.login}</p>;
    }
    return null;
  };

  const response = getResponse();

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formInput.email}
            disabled={!selectable}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={formInput.password}
            disabled={!selectable}
          />
        </label>
      </div>
      <div>{response}</div>
      {!loading ? (
        !success && <button type="submit">Register</button>
      ) : (
        <Spinner />
      )}
    </Form>
  );
};

export default Login;

