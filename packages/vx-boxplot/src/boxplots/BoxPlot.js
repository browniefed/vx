import React from 'react';
import classnames from 'classnames';
import { Group } from '@vx/group';
import additionalProps from '../util/additionalProps';
import { Line, Rect } from 'react-primitives-svg';

export default function BoxPlot({
  left = 0,
  className,
  data,
  max,
  min,
  firstQuartile,
  thirdQuartile,
  median,
  boxWidth,
  fill,
  fillOpacity,
  stroke,
  strokeWidth,
  rx = 2,
  ry = 2,
  medianProps = {},
  maxProps = {},
  minProps = {},
  boxProps = {},
  container = false,
  containerProps = {},
  ...restProps
}) {
  const centerX = left + boxWidth / 2;
  return (
    <Group className={classnames('vx-boxplot', className)}>
      <Line
        className="vx-boxplot-max"
        x1={centerX - boxWidth / 4}
        y1={max}
        x2={centerX + boxWidth / 4}
        y2={max}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...additionalProps(maxProps, {
          data,
          max,
          x1: centerX - boxWidth / 4,
          x2: centerX + boxWidth / 4
        })}
      />
      <Line
        x1={centerX}
        y1={max}
        x2={centerX}
        y2={thirdQuartile}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Rect
        x={left}
        y={thirdQuartile}
        width={boxWidth}
        height={firstQuartile - thirdQuartile}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        fillOpacity={fillOpacity}
        rx={rx}
        ry={ry}
        {...additionalProps(boxProps, {
          data,
          height: firstQuartile - thirdQuartile,
          median,
          firstQuartile,
          thirdQuartile,
          min,
          max,
          x1: left,
          x2: left + boxWidth
        })}
      />
      <Line
        className="vx-boxplot-median"
        x1={left}
        y1={median}
        x2={left + boxWidth}
        y2={median}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...additionalProps(medianProps, {
          data,
          median,
          x1: left,
          x2: left + boxWidth
        })}
      />
      <Line
        x1={centerX}
        y1={firstQuartile}
        x2={centerX}
        y2={min}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Line
        className="vx-boxplot-min"
        x1={centerX - boxWidth / 4}
        y1={min}
        x2={centerX + boxWidth / 4}
        y2={min}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...additionalProps(minProps, {
          data,
          min,
          x1: centerX - boxWidth / 4,
          x2: centerX + boxWidth / 4
        })}
      />
      {container &&
        <Rect
          x={left}
          y={max}
          width={boxWidth}
          height={min - max}
          fillOpacity="0"
          {...additionalProps(containerProps, {
            data,
            x1: left,
            x2: left + boxWidth,
            median,
            max,
            min,
            thirdQuartile,
            firstQuartile
          })}
        />}
    </Group>
  );
}
