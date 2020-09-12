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
data.sort((a: barData, b: barData) => b.time - a.time);

const height: number = 600;
const width: number = 1500;

const VisualizationPage: FunctionComponent = () => {
  /*
  In order to make this dynamic, simply use a use effect hook to fetch the tags array from 
  the user. The tags array is found in the user object, so it can be obtained from the me query.
  
  store data in a useState and pass it to the HorizontalBar component
  */
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
