import React, { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, max } from 'd3';
import useResizeObserver from '../Utilities/useResizeObserver';
import { stringToLightColor } from '../../utils/stringToColor';
import styled from 'styled-components';

const FONT_TEXT_SIZE = 20;
const VariableSvg = styled.svg`
  overflow: visible;
  display: block;
  width: 90%;
  height: 100vh;
`;
interface barData {
  tagName: string;
  time: number;
}
interface propType {
  data: barData[];
}

export default function HorizontalBar({ data }: propType) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((_, index) => index))
      .range([0, dimensions.height]);
    const xScale = scaleLinear()
      .domain([0, max(data, (element: barData) => element.time)])
      .range([0, dimensions.width]);

    svg
      .selectAll('.bar')
      .data(data, (element: barData) => element.tagName)
      .join((enter) =>
        enter.append('rect').attr('y', (_, index) => yScale(index)),
      )
      .attr('fill', (element: barData): string =>
        stringToLightColor(element.tagName),
      )
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .attr('width', (element: barData) => xScale(element.time))
      .attr('y', (_, index) => yScale(index));
    svg
      .selectAll('.label')
      .data(data, (element: barData) => element.tagName)
      .join((enter) =>
        enter
          .append('text')
          .attr('y', (_, index) => yScale(index) + yScale.bandwidth() / 2 + 5),
      )
      .text((element: barData) => element.tagName)
      .attr('font-size', `${FONT_TEXT_SIZE}px`)
      .attr('x', (element: barData) => {
        const width = xScale(element.time);
        return width + 5;
      })
      .attr('y', (_, index) => yScale(index) + FONT_TEXT_SIZE)
      .text((element: barData) => element.time)
      .attr('font-size', `${FONT_TEXT_SIZE}px`)
      .attr('x', (element: barData) => {
        const width = xScale(element.time);
        return width + 5;
      })
      .attr(
        'y',
        (_, index) => yScale(index) + yScale.bandwidth() - FONT_TEXT_SIZE,
      );
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <VariableSvg ref={svgRef}></VariableSvg>
    </div>
  );
}
