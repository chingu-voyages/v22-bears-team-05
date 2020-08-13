import React from 'react';
import styled from 'styled-components';

import App from '../components/App';
import {GoalList} from '../components/Goals';

const Container = styled.div`
  font-family: Montserrat;
`;

const GOALS = [
  {
    goalId: '0',
    title: 'Complete Chingu Voyage 22',
  },
  {
    goalId: '1',
    title: 'Learn GraphQL',
  },
  {
    goalId: '2',
    title: 'Become a React Testing Master',
  },
];

const HomePage = () => {
  return (
    <App>
      <Container>
        <h1>{`Your Goals`}</h1>
        <GoalList goals={GOALS} />
      </Container>
    </App>
  );
};

export default HomePage;
