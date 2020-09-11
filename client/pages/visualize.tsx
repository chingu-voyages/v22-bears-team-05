// import styled from 'styled-components';
import App from '../components/App';
import Head from 'next/head';
import React, { /*useRef,*/ FunctionComponent /*,useEffect*/ } from 'react';
import { withApollo } from '../utils/withApollo';
import HorizontalBar from '../components/Visualization/HorizontalBar';

interface barData {
  tagName: string;
  time: number;
}
const data: barData[] = [
  { tagName: 'Javascript', time: 101 },
  { tagName: 'React', time: 90 },
  { tagName: 'MongoDB', time: 75 },
  { tagName: 'Typescript', time: 25 },
  { tagName: 'Python', time: 0.5 },
  { tagName: 'd3.js', time: 6 },
  { tagName: 'Java', time: 45 },
  { tagName: 'Angular', time: 70 },
  { tagName: 'Postgres', time: 68 },
  { tagName: 'Flow', time: 62 },
  { tagName: 'Rust', time: 0.02 },
  { tagName: 'tailwind', time: 4 },
  { tagName: 'Node.js', time: 14 },
  { tagName: 'Jest', time: 11 },
  { tagName: 'longerTag', time: 7 },
];
data.sort((a: barData, b: barData) => b.time - a.time);

const height: number = 600;
const width: number = 1500;

const VisualizationPage: FunctionComponent = () => {
  return (
    <App>
      <Head>
        <title>visualization</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HorizontalBar data={data}></HorizontalBar>
    </App>
  );
};

export default withApollo({ ssr: false })(VisualizationPage);
