import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Polygon, Circle } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { letterFrequency } from "@vx/mock-data";
import { scaleLinear } from "@vx/scale";
import { Point } from "@vx/point";
import { max, min } from "d3-array";

const { width, height } = Dimensions.get("window");
const { Line, LineRadial } = Shape;
const margin = { top: 40, left: 80, right: 80, bottom: 80 };
const levels = 5;
const ANG = 360;

const data = letterFrequency.slice(2, 12);

const calcAxis = length => {
  if (!length) return [];
  return new Array(length + 1).fill(0).map((v, i) => ({ angle: i * (ANG / length) }));
};

function calcPoints(length, radius) {
  const step = Math.PI * 2 / length;
  return new Array(length).fill(0).map((v, i) => {
    return {
      x: radius * Math.sin(i * step),
      y: radius * Math.cos(i * step),
    };
  });
}

function calcCoordinates(data, scale, access) {
  const step = Math.PI * 2 / data.length;
  const points = new Array(data.length).fill({});
  const pointStr = new Array(data.length + 1).fill("").reduce((res, v, i) => {
    if (i > data.length) return res;
    const x = scale(access(data[i - 1])) * Math.sin(i * step);
    const y = scale(access(data[i - 1])) * Math.cos(i * step);
    points[i - 1] = { x, y };
    return (res += `${x},${y} `);
  });

  points.str = pointStr;
  return points;
}

class RadarDemo extends Component {
  render() {
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const webs = calcAxis(data.length);
    const radius = min([xMax, yMax]) / 2;
    const points = calcPoints(data.length, radius);
    const labelMargin = max(Object.values(margin)) - 20;

    const x = d => d.letter;
    const y = d => d.frequency;

    const rScale = scaleLinear({
      range: [0, Math.PI * 2],
      domain: [ANG, 0],
    });

    const yScale = scaleLinear({
      range: [0, radius],
      domain: [0, max(data, y)],
    });

    const polyPoints = calcCoordinates(data, yScale, y);
    return (
      <Svg width={width} height={height}>
        <Rect fill="#FAF7E9" width={width} height={height} />
        <Group top={height / 2 - margin.top} left={width / 2}>
          {[...new Array(levels)].map((v, i) => (
            <LineRadial
              data={webs}
              key={`web-${i}`}
              angle={d => rScale(d.angle)}
              radius={(i + 1) * radius / levels}
              fill="none"
              stroke="#d9d9d9"
              strokeWidth={2}
              strokeOpacity={0.8}
              strokeLinecap="round"
            />
          ))}
          {[...new Array(data.length)].map((v, i) => (
            <Line
              key={`line-${i}`}
              from={new Point({ x: 0, y: 0 })}
              to={new Point({ x: points[i].x, y: points[i].y })}
              stroke="#d9d9d9"
            />
          ))}
          <Polygon
            points={polyPoints.str}
            fill="#ff9933"
            fillOpacity="0.3"
            stroke="#ff9933"
            strokeWidth={1}
          />
          {polyPoints.map((v, i) => (
            <Circle key={`point-${i}`} cx={v.x} cy={v.y} r={4} fill="#f5810c" className="dots" />
          ))}
        </Group>
      </Svg>
    );
  }
}

export default RadarDemo;
