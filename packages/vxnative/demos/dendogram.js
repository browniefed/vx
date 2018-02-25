import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Circle, G, Text } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { Cluster } from "@vx/hierarchy";
import { hierarchy } from "d3-hierarchy";
import { LinearGradient } from "@vx/gradient";

const { width, height } = Dimensions.get("window");
const { LinkVertical } = Shape;

const raw = {
  name: "T",
  children: [
    {
      name: "A",
      children: [
        { name: "A1" },
        { name: "A2" },
        {
          name: "C",
          children: [
            {
              name: "C1",
            },
          ],
        },
      ],
    },
    {
      name: "B",
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
    },
    {
      name: "X",
      children: [
        {
          name: "Z",
        },
      ],
    },
  ],
};

function Node({ node, events }) {
  const width = 40;
  const height = 20;
  return (
    <Group top={node.y} left={node.x}>
      {node.depth === 0 && (
        <Rect width={width} height={height} y={-height / 2} x={-width / 2} fill="url(#top)" />
      )}
      {node.depth !== 0 && (
        <Circle
          r={12}
          fill="#306c90"
          stroke={node.children ? "white" : "#ddf163"}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.data.name)}`);
          }}
        />
      )}
      <Text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={node.depth === 0 ? "#286875" : node.children ? "white" : "#ddf163"}
      >
        {node.data.name}
      </Text>
    </Group>
  );
}

function Link({ link }) {
  return (
    <LinkVertical data={link} stroke="#f7f7f3" strokeWidth="1" strokeOpacity={0.2} fill="none" />
  );
}

const margin = {
  top: 40,
  left: 0,
  right: 0,
  bottom: 110,
};

class DendogramDemo extends Component {
  render() {
    const data = hierarchy(raw);

    return (
      <Svg width={width} height={height}>
        <LinearGradient id="top" from="#79d259" to="#37ac8c" />
        <Rect width={width} height={height} fill="#306c90" />
        <Cluster
          top={margin.top}
          left={margin.left}
          root={data}
          size={[width - margin.left - margin.right, height - margin.top - margin.bottom]}
          nodeComponent={Node}
          linkComponent={Link}
        />
      </Svg>
    );
  }
}

export default DendogramDemo;
