// import styled from 'styled-components';
import App from '../components/App';
import Head from 'next/head';
import React, { useRef, FunctionComponent, useEffect } from 'react';
import { withApollo } from '../utils/withApollo';
import { select, scaleBand, scaleLinear, max } from 'd3';
import stringToColor from './../utils/stringToColor';
import { string } from 'prop-types';

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
data.sort((a: barData, b: barData) => b.time - a.time);

const height: number = 300;
const width: number = 300;

const VisualizationPage: FunctionComponent = () => {
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((_, index) => index))
      .range([0, height]);
    const xScale = scaleLinear()
      .domain([0, max(data, (element: barData) => element.time)])
      .range([0, width]);
    svg
      .selectAll('.bar')
      .data(data, (element: barData) => element.tagName)
      .join((enter) =>
        enter.append('rect').attr('y', (_, index) => yScale(index)),
      )
      .attr('fill', (element: barData): string =>
        stringToColor(element.tagName),
      );
  }, []);
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
