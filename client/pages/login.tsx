import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';

import Links from '../components/Links';

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  font-size: 1.1em;

  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px 0 10px 10px;
    max-width: 340px;
    font-size: 1.1em;
  }

  button {
    border-radius: 17px;
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    border-radius: 0;
    height: 50px;
    background-color: #4ea5d9;
    max-width: 400px;
    font-size: 1.1em;
    border: none;
  }
`;

type LoginInput = {
  email: string;
  password: string;
};

const Login: FunctionComponent = () => {
  const initState: LoginInput = {
    // Sample working login
    email: 'test@test.com',
    password: 'Password123!',
  };

  const [formInput, setFormInput] = useState(initState);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const requestBody = {
      query: `
        mutation Login($email: String!, $password: String!) {
          login(
            email: $email,
            password: $password
          ) {
            id
            token
          }
        }
      `,
      variables: {
        email: formInput.email,
        password: formInput.password,
      },
    };

    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Login failed!');
      }

      const { data } = await response.json();

      if (!data.login) {
        return false;
      }

      console.log('Login Data', data.login);

      // TODO: Do something with login data
      return true;
    } catch (err) {
      console.log(err);
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

  return (
    <>
      <Links />
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
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </Form>
    </>
  );
};

export default Login;
