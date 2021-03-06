import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Circle, G, Text } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { scaleTime, scaleLog } from "@vx/scale";
import { curveBasisOpen } from "@vx/curve";
import { appleStock } from "@vx/mock-data";
import { extent } from "d3-array";
import { LinearGradient } from "@vx/gradient";

const { width, height } = Dimensions.get("window");
const { LineRadial } = Shape;

const x = d => new Date(d.date);
const y = d => d.close;
const margin = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 120,
};

const capPoints = [appleStock[0]].concat([appleStock[appleStock.length - 1]]);

class LineRadialDemo extends Component {
  render() {
    // bounds
    const radius = Math.min(width, height) / 2;

    const xScale = scaleTime({
      range: [0, Math.PI * 2],
      domain: extent(appleStock, x),
    });
    const yScale = scaleLog({
      range: [0, height / 2 - 20],
      domain: extent(appleStock, y),
    });

    return (
      <Svg width={width} height={height}>
        <LinearGradient from="#e5fd3d" to="#aeeef8" id="line-gradient" />
        <Rect x={0} y={0} width={width} height={height} fill="#744cca" />
        <Group top={height / 2} left={width / 2}>
          {yScale.ticks().map((tick, i) => {
            return (
              <G key={`radial-grid-${i}`}>
                <Circle
                  r={yScale(tick)}
                  stroke="#aeeef8"
                  strokeWidth={1}
                  fill="#aeeef8"
                  fillOpacity={1 / (i + 1) - 1 / i * 0.2}
                  strokeOpacity={0.2}
                />
                <Text
                  y={-yScale(tick)}
                  textAnchor="middle"
                  dy={"-.33em"}
                  fontSize={8}
                  fill="#aeeef8"
                  fillOpacity={0.6}
                >
                  {tick}
                </Text>
              </G>
            );
          })}
          <LineRadial
            data={appleStock}
            angle={d => xScale(x(d))}
            radius={d => yScale(y(d))}
            fill="none"
            stroke={"url(#line-gradient)"}
            strokeWidth={2}
            strokeOpacity={0.7}
            curve={curveBasisOpen}
            strokeLinecap="round"
          />
          {capPoints.map((d, i) => {
            return (
              <Circle
                key={`line-cap-${i}`}
                cy={-yScale(y(d))}
                cx={xScale(x(d)) * Math.PI / 180}
                r={3}
                fill="#dff84d"
              />
            );
          })}
        </Group>
      </Svg>
    );
  }
}

export default LineRadialDemo;
