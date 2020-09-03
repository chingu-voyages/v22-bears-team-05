import React, { FunctionComponent } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FaSignOutAlt as SignOutIcon } from 'react-icons/fa';

import { LOGOUT_MUTATION } from '../../utils/graphql/mutation';

/* eslint jsx-a11y/no-static-element-interactions: 0 */

const Nav = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;

  a {
    text-decoration: none;
    color: black;
    font-weight: 600;
  }

  @media only screen and (max-width: 500px) {
    opacity: 0;
    height: 0;
    transition: all 300ms ease-out;
    ${(props) => props.show && 'opacity: 1;'}
    ${(props) => props.show && 'height: 25px;'}
  }
`;

const NavItem = styled.div`
  padding: 0.25rem 0.5rem;

  display: flex;
  align-items: center;
  color: #333;

  @media only screen and (min-width: 500px) {
    padding: 1rem 1rem;
  }
`;

const Logout = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

type NavProps = {
  isLoggedIn: boolean;
  email: string;
  show: boolean;
};

const NavBar: FunctionComponent<NavProps> = ({ isLoggedIn, email, show }) => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [logout] = useMutation(LOGOUT_MUTATION);

  let body = null;

  // User is not authenticated
  if (!isLoggedIn) {
    body = (
      <Nav show={show}>
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
      <Nav show={show}>
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
