import { useQuery } from '@apollo/client';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import App from '../components/App';
import { MyRewards } from '../components/Rewards';
import Spinner from '../components/Spinner';
import { GET_MY_DATA_QUERY } from '../utils/graphql/query';
import { useCheckIfAuth } from '../utils/useCheckIfAuth';
import { withApollo } from '../utils/withApollo';

const Container = styled.div`
  font-family: Montserrat;
  max-width: 500px;
  margin: 2em auto;
`;

const Rewards = () => {
  const { data, error, loading } = useQuery(GET_MY_DATA_QUERY);

  useCheckIfAuth(error);

  if (loading) return <Spinner />;
  if (data === undefined) {
    return null;
  }

  return (
    <App>
      <Head>
        <title>Goal Tracker | My Rewards</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container>
        <MyRewards
          originalSmallRewards={data?.me?.smallRewards || []}
          originalMediumRewards={data?.me?.mediumRewards || []}
          originalLargeRewards={data?.me?.largeRewards || []}
        />
      </Container>
    </App>
  );
};

export default withApollo({ ssr: true })(Rewards);
