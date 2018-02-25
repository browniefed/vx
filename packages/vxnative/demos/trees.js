import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Circle, G, Text } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { hierarchy } from "d3-hierarchy";
import { LinearGradient } from "@vx/gradient";

const { width, height } = Dimensions.get("window");
const { LinkHorizontal } = Shape;
const raw = {
  name: "T",
  children: [
    {
      name: "A",
      children: [
        { name: "A1" },
        { name: "A2" },
        { name: "A3" },
        {
          name: "C",
          children: [
            {
              name: "C1",
            },
            {
              name: "D",
              children: [
                {
                  name: "D1",
                },
                {
                  name: "D2",
                },
                {
                  name: "D3",
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "Z" },
    {
      name: "B",
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
    },
  ],
};

function Node({ node, events }) {
  const width = 40;
  const height = 20;
  return (
    <Group top={node.x} left={node.y}>
      {node.depth === 0 && <Circle r={12} fill="url(#lg)" />}
      {node.depth !== 0 && (
        <Rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill={"#272b4d"}
          stroke={node.children ? "#03c0dc" : "#26deb0"}
          strokeWidth={1}
          strokeDasharray={!node.children ? "2,2" : "0"}
          strokeOpacity={!node.children ? 0.6 : 1}
          rx={!node.children ? 10 : 0}
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
        fill={node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"}
      >
        {node.data.name}
      </Text>
    </Group>
  );
}

function Link({ link }) {
  return <LinkHorizontal data={link} stroke="#374469" strokeWidth="1" fill="none" />;
}

const margin = {
  top: 10,
  left: 30,
  right: 40,
  bottom: 80,
};

class TreeDemo extends Component {
  render() {
    const data = hierarchy(raw);

    return (
      <Svg width={width} height={height}>
        <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
        <Rect width={width} height={height} fill="#272b4d" />
        <Tree
          top={margin.top}
          left={margin.left}
          root={data}
          size={[height - margin.top - margin.bottom, width - margin.left - margin.right]}
          nodeComponent={Node}
          linkComponent={Link}
        />
      </Svg>
    );
  }
}

export default TreeDemo;
