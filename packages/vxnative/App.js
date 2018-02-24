import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as RNSvg from "react-native-svg";
import { buildInject } from "@vx/primitives";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
buildInject(RNSvg);

const { width, height } = Dimensions.get("window");

const Svg = RNSvg.Svg;

const data = letterFrequency.slice(5);

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

// accessors
const x = d => d.letter;
const y = d => +d.frequency * 100;


export default class App extends Component {
  render() {
    const xMax = width;
    const yMax = height - 120;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4,
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, max(data, y)],
    });
    return (
      <View style={styles.container}>
        <Svg width={width} height={height}>
          <Group top={40}>
            {data.map((d, i) => {
              const barHeight = yMax - yScale(y(d));
              return (
                <Group key={`bar-${x(d)}`}>
                  <Shape.Bar
                    width={xScale.bandwidth()}
                    height={barHeight}
                    x={xScale(x(d))}
                    y={yMax - barHeight}
                    fill="rgba(23, 233, 217, .5)"
                    data={{ x: x(d), y: y(d) }}
                    onClick={data => event => {
                      alert(`clicked: ${JSON.stringify(data)}`);
                    }}
                  />
                </Group>
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
