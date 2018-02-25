import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Circle, G, Text } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { GradientPinkBlue } from "@vx/gradient";
import { letterFrequency, browserUsage } from "@vx/mock-data";

const { width, height } = Dimensions.get("window");
const { Pie } = Shape;

const margin = {
  top: 30,
  left: 20,
  right: 20,
  bottom: 110,
};

const letters = letterFrequency.slice(0, 4);
const browsers = Object.keys(browserUsage[0])
  .filter(k => k !== "date")
  .map(k => ({ label: k, usage: browserUsage[0][k] }));

function Label({ x, y, children }) {
  return (
    <Text fill="white" textAnchor="middle" x={x} y={y} dy=".33em" fontSize={9}>
      {children}
    </Text>
  );
}

class PieDemo extends Component {
  render() {
    const radius = Math.min(width, height) / 2;

    return (
      <Svg width={width} height={height}>
        <GradientPinkBlue id="gradients" />
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradients)" />
        <Group top={height / 2 - margin.top} left={width / 2}>
          <Pie
            data={browsers}
            pieValue={d => d.usage}
            outerRadius={radius - 80}
            innerRadius={radius - 120}
            fill="white"
            fillOpacity={d => 1 / (d.index + 2)}
            cornerRadius={3}
            padAngle={0}
            centroid={(centroid, arc) => {
              const [x, y] = centroid;
              const { startAngle, endAngle } = arc;
              if (endAngle - startAngle < 0.1) return null;
              return (
                <Label x={x} y={y}>
                  {arc.data.label}
                </Label>
              );
            }}
          />
          <Pie
            data={letters}
            pieValue={d => d.frequency}
            outerRadius={radius - 135}
            fill="black"
            fillOpacity={d => 1 / (d.index + 2)}
            centroid={(centroid, arc) => {
              const [x, y] = centroid;
              return (
                <Label x={x} y={y}>
                  {arc.data.letter}
                </Label>
              );
            }}
          />
        </Group>
      </Svg>
    );
  }
}

export default PieDemo;
