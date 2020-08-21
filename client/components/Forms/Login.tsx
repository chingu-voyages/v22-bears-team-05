import React, { useState, FunctionComponent } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Spinner from '../Spinner';
import { login } from '../../utils/auth';

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

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const { email, password } = formInput;

    const errorMessage = getLoginError(email, password);
    setError(errorMessage);

    if (errorMessage) {
      return false;
    }

    setSelectable(false);
    setLoading(true);

    try {
      const authData = await login(email, password);

      if (!authData) {
        setSelectable(true);
        setLoading(false);
        setError(LOGIN_ERRORS.loginFail);
        return false;
      }

      const { token, id } = authData;

      setSelectable(true);
      setLoading(false);
      setSuccess(true);

      // TODO: call some apollo or context function to save this data
      console.log(email, id, token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getLoginError = (emailInput: string, passwordInput: string) => {
    // Get error if necessary
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
        !success && <button type="submit">Login</button>
      ) : (
        <Spinner />
      )}
    </Form>
  );
};

export default Login;
