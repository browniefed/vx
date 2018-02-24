import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as RNSvg from "react-native-svg";
import { buildInject } from "@vx/primitives";
import * as Shape from "@vx/shape";
import { Group } from '@vx/group';
import { GlyphCircle } from '@vx/glyph';
import * as Gradient from '@vx/gradient';
import { scaleLinear } from '@vx/scale';
import { genRandomNormalPoints } from '@vx/mock-data';

buildInject(RNSvg);

const { width, height } = Dimensions.get("window");

const { Svg, Rect } = RNSvg;

const points = genRandomNormalPoints(600).filter((d, i) => {
  return i < 600;
});

const x = d => d[0];
const y = d => d[1];
const z = d => d[2];

export default class App extends Component {
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
      <View style={styles.container}>
        <Svg width={width} height={height}>
          <Gradient.GradientPinkRed id="pink" />
          <Rect x={0} y={0} width={width} height={height} rx={14} fill={"url(#pink)"} />
          <Group>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
