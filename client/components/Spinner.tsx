import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {
  small?: boolean;
}

const Container = styled.div<{ small: boolean }>`
  position: relative;
  height: ${({ small }) => (small ? '25px' : '50px')};
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ small }) => (small ? '25px' : '50px')};
    height: ${({ small }) => (small ? '25px' : '50px')};
    margin-top: ${({ small }) => (small ? '-12.5px' : '-25px')};
    margin-left: -25px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: #4ea5d9;
    border-bottom-color: #4ea5d9;
    animation: spinner 0.8s ease infinite;
  }
`;

const Spinner: FunctionComponent<IProps> = ({ small = false }) => (
  <Container small={small}>
    <div className="spinner" />
  </Container>
);

export default Spinner;
