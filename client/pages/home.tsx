import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';

import { withApollo } from '../utils/withApollo';
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

const GET_GOALS_QUERY = gql`
  query GetGoals {
    getAllGoals {
      _id
      name
      tasks {
        _id
        name
        subtasks {
          _id
          name
        }
      }
    }
  }
`;

const HomePage = () => {
  // TODO: Replace with correct logic here
  const { data, error } = useQuery(GET_GOALS_QUERY);
  // To peek inside the output of this query,
  // simply console log both data and error

  // const client = useApolloClient();
  return (
    <App>
      <Head>
        <title>Goal Tracker | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container>
        <h1>Your Goals</h1>
        <GoalList goals={GOALS} />
      </Container>
    </App>
  );
};

export default withApollo({ ssr: true })(HomePage);
