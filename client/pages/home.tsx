import { useQuery } from '@apollo/client';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import App from '../components/App';
import { GoalList } from '../components/Goals';
import Spinner from '../components/Spinner';
import { GET_GOALS_QUERY } from '../utils/graphql/query';
import { useCheckIfAuth } from '../utils/useCheckIfAuth';
import { withApollo } from '../utils/withApollo';

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

const HomePage = () => {
  const checkAuth = useCheckIfAuth();
  const { data, error, loading } = useQuery(GET_GOALS_QUERY);

  checkAuth(error);

  if (loading) return <Spinner />;
  if (data === undefined) {
    return null;
  }

  return (
    <App>
      <Head>
        <title>Goal Tracker | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container>
        <h1>Your Goals</h1>
        <GoalList goals={data.getAllGoals} />
      </Container>
    </App>
  );
};

export default withApollo({ ssr: true })(HomePage);
