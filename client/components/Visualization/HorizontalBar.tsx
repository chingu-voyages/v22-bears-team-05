import React, { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, max } from 'd3';
import useResizeObserver from '../Utilities/useResizeObserver';
import { stringToLightColor } from '../../utils/stringToColor';
import styled from 'styled-components';
import measureText from '../../utils/measureText';
const FONT_TEXT_SIZE = 16;
const lineSize = FONT_TEXT_SIZE * 1.2;
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

function getTextX(element: barData, width: number) {
  //const pixelLength = FONT_TEXT_SIZE * element.tagName.length
  const pixelLength = measureText(element.tagName);
  if (pixelLength > width) return width + 10;
  else return width - pixelLength;
}

export default function HorizontalBar({ data }: propType) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    svg.selectAll('text').remove();
    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((_, index) => index))
      .range([0, dimensions.height]);
    const xScale = scaleLinear()
      .domain([0, max(data, (element: barData) => element.time)])
      .range([0, dimensions.width * 0.9]);

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
      .attr('height', () => {
        console.log(yScale.bandwidth());
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
      .attr('x', (element: barData) => {
        return getTextX(element, xScale(element.time));
      })
      .attr('y', (_, index) => yScale(index) + lineSize)
      .append('tspan')
      .text((element: barData) => {
        const isHour = element.time > 1;
        const unit = isHour ? 'hr' : 'min';
        const value = isHour ? element.time : Math.floor(element.time * 60);
        return `${value} ${unit}`;
      })
      .attr('font-size', () => `${FONT_TEXT_SIZE}px`)
      .attr('x', (element: barData) => {
        return getTextX(element, xScale(element.time));
      })
      .attr('y', (_, index) => yScale(index) + lineSize * 2);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <VariableSvg ref={svgRef}></VariableSvg>
    </div>
  );
}
