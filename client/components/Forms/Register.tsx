import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { useApolloClient, gql } from '@apollo/client';
import { FaCheck } from 'react-icons/fa';

import Spinner from '../Spinner';
import { REGISTER_MUTATION } from '../../utils/graphql/mutation';
import { REGISTER_VARIABLES } from '../../utils/graphql/variables';
import { MeDocument } from '../../utils/graphql/documents';

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;

  /* Parent Container for Validation Icon + Text Input */
  .confirmPassword,
  .password,
  .email {
    max-width: 340px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    position: relative;
    margin: 0 auto;

    input {
      padding-right: 40px;
    }
  }

  .validateIcon {
    position: absolute;
    left: 100%;
    color: #4f8a10;
    left: calc(100% - 35px);
  }

  .passwordCriteria {
    color: black;
    list-style: none;

    li {
      padding-top: 5px;
    }

    .icon {
      color: green;
      margin-right: 10px;
    }
  }
`;

const REGISTER_ERRORS = {
  invalidEmail: 'A Valid Email is Required to Sign Up',
  emptyPassword: 'Enter a Password',
  emptyConfirmPassword: 'Confirm Your Password',
  confirmPasswordMatch: "Password fields don't match",
  passwordCriteria: 'Password must contain...',
};

const SUCCESS_LABEL = {
  register: 'Success! Redirecting...',
};

type LoginInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initState: LoginInput = {
  email: '',
  password: '',
  confirmPassword: '',
};

const Register: FunctionComponent = () => {
  const client = useApolloClient();
  const router = useRouter();

  const [formInput, setFormInput] = useState(initState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectable, setSelectable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Get error if necessary, after user submits
  const getRegisterError = (
    emailInput: string,
    passwordInput: string,
    confirmPasswordInput: string,
  ) => {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!emailInput || !emailInput.match(emailRegex)) {
      return REGISTER_ERRORS.invalidEmail;
    }

    if (!passwordInput) {
      return REGISTER_ERRORS.emptyPassword;
    }

    if (!confirmPasswordInput) {
      return REGISTER_ERRORS.emptyConfirmPassword;
    }

    if (passwordInput !== confirmPasswordInput) {
      return REGISTER_ERRORS.confirmPasswordMatch;
    }
    return null;
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formInput;

    const errorMessage = getRegisterError(email, password, confirmPassword);
    setError(errorMessage);

    if (errorMessage) {
      return false;
    }

    setSelectable(false);
    setLoading(true);

    try {
      await client.resetStore();
      await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: REGISTER_VARIABLES({ email, password, confirmPassword }),
        update: (cache, { data }) => {
          cache.writeQuery({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: data?.register.user,
            },
          });
          cache.evict({ fieldName: 'goals:{}' });
        },
      });

      setSuccess(true);
      window.location.pathname = '/home';
      return true;
    } catch (err) {
      setSelectable(true);
      setLoading(false);
      setError(err.message);
      return false;
    }
  };

  const isEmailValid = (emailInput: string) => {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    return emailRegex.test(emailInput);
  };

  const isPasswordValid = (passwordInput: string) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[*.!@#$%^&(){}[\]:;<>,\.\?\/~_\+\-=\|\\ ])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9*.!@#$%^&(){}[\]:;<>,\.\?\/~_\+\-=\|\\ ]{6,128}$/;
    return passwordRegex.test(passwordInput);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();

    // For instant feedback for user experience
    // Check for valid email input
    if (e.target.name === 'email') {
      setEmailError(false);
      if (!isEmailValid(e.target.value)) {
        setEmailError(true);
      }
    }

    // check for valid password input
    if (e.target.name === 'password') {
      setPasswordError(false);
      if (!isPasswordValid(e.target.value)) {
        setPasswordError(true);
      }
    }

    // Store Input Change
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
      return <p className="success">{SUCCESS_LABEL.register}</p>;
    }
    return null;
  };

  const passwordCriteriaItem = (label: string, isValid: boolean) => (
    <div style={{ paddingLeft: isValid ? 0 : 27 }}>
      {isValid && <FaCheck size={17} className="icon" />}
      {label}
    </div>
  );

  // instant feedback for password criteria
  const getPasswordCriteria = (passwordInput: string) => {
    const criteria = [];

    const hasNumCharacters = /.{6,128}/.test(passwordInput);
    const hasUppercase = /(?=.*[A-Z])/.test(passwordInput);
    const hasLowercase = /(?=.*[a-z])/.test(passwordInput);
    const hasNumber = /\d/.test(passwordInput);
    const hasSymbol = /^.*(?=.*[*.!@#$%^&(){}[\]:;<>,\.\?\/~_\+\-=\|\\ ]).*$/.test(
      passwordInput,
    );

    criteria.push(
      passwordCriteriaItem('At least 6 characters', hasNumCharacters),
    );
    criteria.push(passwordCriteriaItem('1 Uppercase Letter', hasUppercase));
    criteria.push(passwordCriteriaItem('1 Lowercase Letter', hasLowercase));
    criteria.push(passwordCriteriaItem('1 Number', hasNumber));
    criteria.push(passwordCriteriaItem('1 Symbol', hasSymbol));

    return criteria;
  };

  const response = getResponse();
  const { email, password, confirmPassword } = formInput;
  const passwordCriteria = getPasswordCriteria(password);

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">
          Email
          <div className="email">
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={email}
              disabled={!selectable}
            />
            {email && !emailError && (
              <FaCheck size={25} className="validateIcon" />
            )}
          </div>
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <div className="password">
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={password}
              disabled={!selectable}
            />
            {password && !passwordError && (
              <FaCheck size={25} className="validateIcon" />
            )}
          </div>
        </label>
        {password && passwordError && (
          <ul className="passwordCriteria">
            Your Password Must Contain:
            {passwordCriteria.map((criteria, i) => (
              <li key={i}>{criteria}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword">
          Confirm Password
          <div className="confirmPassword">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleInputChange}
              value={formInput.confirmPassword}
              disabled={!selectable}
            />
            {password && confirmPassword === password && (
              <FaCheck size={25} className="validateIcon" />
            )}
          </div>
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

export default Register;
