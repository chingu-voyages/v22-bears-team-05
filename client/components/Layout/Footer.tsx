import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
  padding-bottom: 2rem;
`;

const Footer: React.FC = () => (
  <StyledFooter>
    &copy;&nbsp;
    {`Copyright ${new Date().getFullYear()} | GoalTrack`}
  </StyledFooter>
);

export default Footer;
