import React from 'react';
import styled from 'styled-components';

import App from '../components/App';
import { GoalList } from '../components/Goals';

const Container = styled.div`
  font-family: Montserrat;
`;

type Goal = {
  goalId: string;
  name: string;
};

const GOALS: Goal[] = [
  {
    goalId: '0',
    name: 'Complete Chingu Voyage 22',
  },
  {
    goalId: '1',
    name: 'Learn GraphQL',
  },
  {
    goalId: '2',
    name: 'Become a React Testing Master',
  },
];

const HomePage = () => (
  <App>
    <Container>
      <h1>Your Goals</h1>
      <GoalList goals={GOALS} />
    </Container>
  </App>
);

export default HomePage;
