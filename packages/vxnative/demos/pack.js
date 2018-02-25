import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Circle } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { Pack } from "@vx/hierarchy";
import { hierarchy } from "d3-hierarchy";
import { LinearGradient } from "@vx/gradient";
import { scaleQuantize } from "@vx/scale";
import { exoplanets as data } from "@vx/mock-data";
import { extent } from "d3-array";

const { width, height } = Dimensions.get("window");
const margin = {
  top: 10,
  left: 30,
  right: 40,
  bottom: 80,
};
const exoplanets = data.filter(d => d.distance === 0);
const planets = data.filter(d => d.distance !== 0);
const raw = { children: [{ children: planets }].concat(exoplanets) };

const color = scaleQuantize({
  range: ["#49f4e7", "#11d2f9", "#855af2", "#fd6d6f", "#ffc10e", "#ffe108"].reverse(),
  domain: extent(data, d => +d.radius),
});

class PackDemo extends Component {
  render() {
    const data = hierarchy(raw)
      .sum(d => d.radius * d.radius)
      .sort((a, b) => {
        return (
          !a.children - !b.children ||
          isNaN(a.data.distance) - isNaN(b.data.distance) ||
          a.data.distance - b.data.distance
        );
      });

    return (
      <Svg width={width} height={height}>
        <Rect width={width} height={height} fill="#ffffff" />
        <Pack
          top={-height - margin.bottom}
          left={-width / 2}
          root={data}
          size={[width * 2, height * 2]}
        >
          {({ data }) => {
            const desc = data.descendants().slice(2);
            return desc.map((d, i) => {
              return (
                <Circle key={`cir-${i}`} r={d.r} cx={d.x} cy={d.y} fill={color(+d.data.radius)} />
              );
            });
          }}
        </Pack>
      </Svg>
    );
  }
}

export default PackDemo;
