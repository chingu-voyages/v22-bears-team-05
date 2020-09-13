import { useQuery } from '@apollo/client';
import Head from 'next/head';
import React, { FunctionComponent, useEffect, useState } from 'react';
import App from '../components/App';
import Spinner from '../components/Spinner';
import HorizontalBar from '../components/Visualization/HorizontalBar';
import { ME_QUERY } from '../utils/graphql/query';
import { useCheckIfAuth } from '../utils/useCheckIfAuth';
import { withApollo } from '../utils/withApollo';

interface barData {
  tagName: string;
  time: number;
}

const testData: barData[] = [
  { tagName: 'Javascript', time: 101000 },
  { tagName: 'React', time: 90000 },
  { tagName: 'MongoDB', time: 75000 },
  { tagName: 'Typescript', time: 25000 },
  { tagName: 'Python', time: 2000 },
  { tagName: 'd3.js', time: 26000 },
  { tagName: 'Java', time: 78000 },
  { tagName: 'Angular', time: 70000 },
  { tagName: 'Postgres', time: 68000 },
  { tagName: 'Flow', time: 62000 },
  { tagName: 'Rust', time: 45 },
  { tagName: 'tailwind', time: 4000 },
  { tagName: 'Node.js', time: 14000 },
  { tagName: 'Jest', time: 11000 },
  { tagName: 'longerTag', time: 7000 },
];
testData.sort((a: barData, b: barData) => b.time - a.time);

const Stats: FunctionComponent = () => {
  const [userData, setUserData] = useState<barData[]>();
  const { data, error, loading } = useQuery(ME_QUERY);

  useCheckIfAuth(error);

  useEffect(() => {
    if (!data.me.tags) return;
    const newData: barData[] = [...data.me.tags];
    setUserData(newData.sort((a: barData, b: barData) => b.time - a.time));
  }, [data]);

  if (loading) return <Spinner />;
  if (data === undefined) {
    return null;
  }

  return (
    <App>
      <Head>
        <title>Goal Tracker | My Stats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="stat-container">
        <h1>My Stats</h1>
        <HorizontalBar data={userData} />
      </main>
    </App>
  );
};

export default withApollo({ ssr: true })(Stats);
