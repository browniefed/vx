import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Graph } from "@vx/network";
import { scaleOrdinal, schemeCategory20c } from "d3-scale";
const { width, height } = Dimensions.get("window");

const nodes = [{ x: 50, y: 20 }, { x: 200, y: 300 }, { x: 300, y: 40 }];

const dataSample = {
  nodes,
  links: [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[0] },
  ],
};

class NetworkDemo extends Component {
  render() {
    return (
      <Svg width={width} height={height}>
        <Rect width={width} height={height} fill="#272b4d" />
        <Graph graph={dataSample} />
      </Svg>
    );
  }
}

export default NetworkDemo;
