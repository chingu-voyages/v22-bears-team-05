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

const HomePage = () => {
  const { data, error, loading } = useQuery(GET_GOALS_QUERY);

  useCheckIfAuth(error);

  if (loading) return <Spinner />;
  if (data === undefined) {
    return null;
  }

  return (
    <App isApp>
      <Head>
        <title>Goal Tracker | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container>
        <h1>Your Goals</h1>
        <GoalList
          goals={data.getAllGoals.filter((goal) => goal.isCompleted === false)}
        />
      </Container>
    </App>
  );
};

export default withApollo({ ssr: true })(HomePage);
