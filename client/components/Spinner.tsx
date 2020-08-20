import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 50px;
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
    width: 50px;
    height: 50px;
    margin-top: -25px;
    margin-left: -25px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: #4ea5d9;
    border-bottom-color: #4ea5d9;
    animation: spinner 0.8s ease infinite;
  }
`;

const Spinner: FunctionComponent = () => (
  <Container>
    <div className="spinner" />
  </Container>
);

export default Spinner;
