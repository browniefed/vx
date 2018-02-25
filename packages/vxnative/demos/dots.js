import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { Group } from "@vx/group";
import { GlyphCircle } from "@vx/glyph";
import { GradientPinkRed } from "@vx/gradient";
import { scaleLinear } from "@vx/scale";
import { genRandomNormalPoints } from "@vx/mock-data";
const { width, height } = Dimensions.get("window");

const points = genRandomNormalPoints(600).filter((d, i) => {
  return i < 600;
});

const x = d => d[0];
const y = d => d[1];
const z = d => d[2];

class Dots extends Component {
  render() {
    const xMax = width;
    const yMax = height - 80;
    if (width < 10) return null;

    const xScale = scaleLinear({
      domain: [1.3, 2.2],
      range: [0, xMax],
      clamp: true,
    });
    const yScale = scaleLinear({
      domain: [0.75, 1.6],
      range: [yMax, 0],
      clamp: true,
    });
    return (
      <Svg width={width} height={height}>
        <GradientPinkRed id="pink" />
        <Rect x={0} y={0} width={width} height={height} fill={`url(#pink)`} />
        <Group
          onTouchStart={() => event => {
            if (tooltipTimeout) clearTimeout(tooltipTimeout);
            props.hideTooltip();
          }}
        >
          {points.map((point, i) => {
            return (
              <GlyphCircle
                className="dot"
                key={`point-${point.x}-${i}`}
                fill={"#f6c431"}
                left={xScale(x(point))}
                top={yScale(y(point))}
                size={i % 3 === 0 ? 12 : 24}
              />
            );
          })}
        </Group>
      </Svg>
    );
  }
}

export default Dots;
