// import styled from 'styled-components';
import App from '../components/App';
import Head from 'next/head';
import React, { useRef, FunctionComponent } from 'react';
import { withApollo } from '../utils/withApollo';

interface barData {
  tagName: string;
  time: number;
}
const data: barData[] = [
  { tagName: 'Javascript', time: 120 },
  { tagName: 'React', time: 90 },
  { tagName: 'MongoDB', time: 75 },
  { tagName: 'Typescript', time: 25 },
  { tagName: 'Python', time: 0.5 },
  { tagName: 'd3.js', time: 6 },
  { tagName: 'Node.js', time: 14 },
  { tagName: 'Jest', time: 11 },
  { tagName: 'Cypress', time: 0.06 },
];

const VisualizationPage: FunctionComponent = () => {
  const d3Container = useRef(null);
  // useEffect(() => {

  // })
  return (
    <App>
      <Head>
        <title>visualization</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <pre>{JSON.stringify(data)}</pre>
    </App>
  );
};

export default withApollo({ ssr: false })(VisualizationPage);
