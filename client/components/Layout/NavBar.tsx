import React, { FunctionComponent } from 'react';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  FaUserCircle as ProfileIcon,
  FaSignOutAlt as SignOutIcon,
} from 'react-icons/fa';

import { ME_QUERY } from '../../utils/graphql/query';
import { LOGOUT_MUTATION } from '../../utils/graphql/mutation';

/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */

const Nav = styled.div`
  display: flex;
  flex-flow: row nowrap;

  a {
    text-decoration: none;
    color: black;
    font-weight: 600;
  }
`;

const NavItem = styled.div`
  padding: 1rem 0.5rem;

  display: flex;
  align-items: center;
  color: #333;

  @media only screen and (min-width: 800px) {
    padding: 1rem 2rem;
  }
`;

const Logout = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

type LoginState = {
  isLoggedIn: boolean;
  email: string;
};

const NavBar: FunctionComponent<LoginState> = ({ isLoggedIn, email }) => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [logout] = useMutation(LOGOUT_MUTATION);

  let body = null;

  // User is not authenticated
  if (!isLoggedIn) {
    body = (
      <Nav>
        <NextLink href="/">
          <a>
            <NavItem>About</NavItem>
          </a>
        </NextLink>
        <NextLink href="/register">
          <a>
            <NavItem>Register</NavItem>
          </a>
        </NextLink>
        <NextLink href="/login">
          <a>
            <NavItem>Login</NavItem>
          </a>
        </NextLink>
      </Nav>
    );

    // User is authenticated
  } else {
    body = (
      <Nav>
        <NavItem>{`Signed in as ${email}`}</NavItem>
        <Logout
          onClick={async (e) => {
            e.preventDefault();
            await logout();
            await apolloClient.clearStore();
            router.push('/login');
          }}
        >
          <NavItem>
            <SignOutIcon size={22} />
          </NavItem>
        </Logout>
      </Nav>
    );
  }

  return body;
};

export default NavBar;
