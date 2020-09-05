import { useQuery } from '@apollo/client';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import { ME_QUERY } from '../../utils/graphql/query';
import NavBar from './NavBar';

const Container = styled.header`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 auto;
  background-color: white;

  padding: 0.5rem 1rem;
  z-index: 10;

  max-width: 1500px;

  .header__main {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  @media only screen and (min-width: 500px) {
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    .header__main {
      width: auto;
    }
  }
`;

const NavButton = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (min-width: 500px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const { data } = useQuery(ME_QUERY);

  const [showNav, setShowNav] = useState(false);
  const [logoHref, setLogoHref] = useState('/');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  useEffect(() => {
    // User is Authenticated
    if (data?.me) {
      setLoginEmail(data.me.email);
      setIsLoggedIn(true);
      setLogoHref('/home');
    }
  }, [loginEmail, isLoggedIn, logoHref, data]);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <Container>
      <div className="header__main">
        <NextLink href={logoHref}>
          <a>
            <h2>GoalTrack</h2>
          </a>
        </NextLink>
        <NavButton onClick={toggleNav}>
          <FaBars size={32} />
        </NavButton>
      </div>
      <NavBar isLoggedIn={isLoggedIn} email={loginEmail} show={showNav} />
    </Container>
  );
};

export default Header;
