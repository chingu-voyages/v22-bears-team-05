import { useApolloClient, useMutation } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { FaSignOutAlt as SignOutIcon } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import { LOGOUT_MUTATION } from '../../utils/graphql/mutation';

/* eslint jsx-a11y/no-static-element-interactions: 0 */

interface NavProp {
  show: boolean;
}

const Nav = styled.div<NavProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  & > * {
    margin: 0 auto;
  }

  a,
  a:active,
  a:visited,
  a:hover {
    text-decoration: none;
    color: black;
    font-weight: 600;
  }

  @media only screen and (max-width: 600px) {
    opacity: 0;
    height: 0;
    transition: all 300ms ease-out;
    visibility: hidden;
    ${({ show }) =>
      show &&
      css`
        opacity: 1;
        height: 150px;
        visibility: visible;
      `}
    flex-flow: column nowrap;
  }
`;

const NavItem = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  color: #333;

  @media only screen and (min-width: 600px) {
    padding: 1rem 1rem;
    white-space: nowrap;
  }
`;

const NavLink = styled.a`
  padding: 0.25rem 0.5rem;

  display: flex;
  align-items: center;
  color: #333;
  font-weight: 400 !important;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

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

interface NavProps {
  isLoggedIn: boolean;
  email: string;
  show: boolean;
}

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
        <NextLink href="/rewards">
          <NavLink>My Rewards</NavLink>
        </NextLink>
        <NextLink href="/stats">
          <NavLink>My Stats</NavLink>
        </NextLink>
        <NavItem>{`Signed in as ${email}`}</NavItem>
        <Logout
          onClick={async (e) => {
            e.preventDefault();
            await logout();
            await apolloClient.clearStore();
            router.push('/login');
          }}
          title="Logout"
        >
          <NavItem>
            Logout &nbsp;
            <SignOutIcon size={22} />
          </NavItem>
        </Logout>
      </Nav>
    );
  }

  return body;
};

export default NavBar;
