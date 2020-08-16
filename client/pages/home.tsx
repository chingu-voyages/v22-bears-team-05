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
  tasks?: Task[];
};

type Task = {
  id: string;
  name: string;
  subtasks?: Subtask[];
};

type Subtask = {
  id: string;
  name: string;
};

const GOALS: Goal[] = [
  {
    goalId: '0',
    name: 'Complete Chingu Voyage 22',
    tasks: [
      {
        id: '0',
        name: 'Sprint 1',
        subtasks: [{ id: '0', name: 'A User Story' }],
      },
      { id: '1', name: 'Sprint 2' },
      { id: '2', name: 'Sprint 3' },
    ],
  },
  {
    goalId: '1',
    name: 'Learn GraphQL',
    tasks: [{ id: '0', name: 'Finish howtographql.com tutorial' }],
  },
  {
    goalId: '2',
    name: 'Become a React Testing Master',
    tasks: [
      { id: '0', name: 'Follow Kent C Dodds' },
      { id: '1', name: 'Read React-Testing-Library docs' },
      { id: '2', name: 'Find a Tutorial' },
    ],
  },
  {
    goalId: '3',
    name: 'A New Goal',
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
