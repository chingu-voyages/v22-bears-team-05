import { max, scaleBand, scaleLinear, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { stringToAnyColor } from '../../utils/stringToColor';
import useResizeObserver from '../Utilities/useResizeObserver';

const FONT_TEXT_SIZE = 16;
const lineSize = FONT_TEXT_SIZE * 1.2; //lineSize is usually 1.2 times the font size
const BAR_HEIGHT = 75; //px height of bar; should be large enough for the text to fit
const X_OFFSET = 10;

const VariableSvg = styled.svg`
  overflow: visible;
  display: block;
  width: 100%;
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

  // will be called initially and whenever data changes
  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;
    svg.selectAll('text').remove();
    svg.attr('height', BAR_HEIGHT * data.length); //adjust svg height to grow with data size
    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((_, index) => index))
      .range([0, BAR_HEIGHT * data.length]);
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
        stringToAnyColor(element.tagName),
      )
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', () => {
        return yScale.bandwidth();
      })
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
      .attr('font-weight', 'bold')
      .attr('x', (element: barData) => {
        return xScale(element.time) + X_OFFSET;
      })
      .attr('y', (_, index) => yScale(index) + lineSize)
      .append('tspan')
      .attr('font-weight', 'normal')
      .text((element: barData) => {
        const isDay = element.time >= 86400;
        const isHour = element.time >= 3600;
        const isMinute = element.time >= 60;
        if (isDay) return `${(element.time / 86400).toFixed(2)} days`;
        if (isHour) return `${(element.time / 3600).toFixed(2)} hrs`;
        if (isMinute) return `${Math.floor(element.time / 60)} min`;
        else return `${element.time} seconds`;
      })
      .attr('font-size', () => `${FONT_TEXT_SIZE}px`)
      .attr('x', (element: barData) => {
        return xScale(element.time) + X_OFFSET;
      })
      .attr('y', (_, index) => yScale(index) + lineSize * 2);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <VariableSvg ref={svgRef}></VariableSvg>
    </div>
  );
}
