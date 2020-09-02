import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NextLink from 'next/link';

import NavBar from './NavBar';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME_QUERY } from '../../utils/graphql/query';

const Container = styled.header`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: white;

  padding: 0.5rem 2rem;
`;

const Header: React.FC = () => {
  const { data, loading, error } = useQuery(ME_QUERY);

  let logoHref = '/';
  let isLoggedIn = false;
  let email = '';

  // User is Authenticated
  if (data?.me) {
    email = data.me.email;
    isLoggedIn = true;
    logoHref = '/home';
  }

  return (
    <Container>
      <NextLink href={logoHref}>
        <a>
          <h1>GoalTrack</h1>
        </a>
      </NextLink>
      <NavBar isLoggedIn={isLoggedIn} email={email} />
    </Container>
  );
};

export default Header;
