import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { Treemap } from "@vx/hierarchy";
import { hierarchy, stratify } from "d3-hierarchy";
import { shakespeare } from "@vx/mock-data";
import { treemapSquarify } from "d3-hierarchy";
import { scaleLinear } from "@vx/scale";
import { interpolateRgb } from "d3-interpolate";

const { width, height } = Dimensions.get("window");
const margin = {
  top: 0,
  left: 30,
  right: 40,
  bottom: 80,
};

const color = scaleLinear({
  domain: [0, Math.max(...shakespeare.map(d => d.size || 0))],
  range: ["#0373d9", "#00ff70"],
});

class TreeMapDemo extends Component {
  render() {
    const nodes = stratify()
      .id(d => d.id)
      .parentId(d => d.parent)(shakespeare)
      .sum(d => d.size || 0);

    const data = hierarchy(nodes).sort((a, b) => b.value - a.value);
    return (
      <Svg width={width} height={height}>
        <Rect width={width} height={height} fill="#3436b8" />
        <Treemap
          top={margin.top}
          root={data}
          size={[width, height - margin.top - margin.bottom]}
          tile={treemapSquarify}
          round={true}
        >
          {({ data }) => {
            return (
              <Group>
                {data
                  .descendants()
                  .reverse()
                  .map((node, i) => (
                    <Group top={node.y0} left={node.x0} key={`node-${i}`}>
                      {node.depth == 1 && (
                        <Rect
                          id={`rect-${i}`}
                          width={node.x1 - node.x0}
                          height={node.y1 - node.y0}
                          fill={"transparent"}
                          stroke={"#3436b8"}
                          strokeWidth={4}
                        />
                      )}
                      {node.depth > 2 && (
                        <Rect
                          id={`rect-${i}`}
                          width={node.x1 - node.x0}
                          height={node.y1 - node.y0}
                          fill={color(node.value)}
                          stroke={"#3436b8"}
                        />
                      )}
                    </Group>
                  ))}
              </Group>
            );
          }}
        </Treemap>
      </Svg>
    );
  }
}

export default TreeMapDemo;
