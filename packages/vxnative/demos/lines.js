import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { curveMonotoneX } from "@vx/curve";
import { genDateValue } from "@vx/mock-data";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";

const { width, height } = Dimensions.get("window");
const { LinePath } = Shape;



function genLines(num) {
  return new Array(num).fill(1).map(() => {
    return genDateValue(25);
  });
}

const series = genLines(12);
const data = series.reduce((rec, d) => {
  return rec.concat(d);
}, []);

// accessors
const x = d => d.date;
const y = d => d.value;

class Lines extends Component {
  render() {
    const xMax = width;
    const yMax = height / 8;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x),
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(data, y)],
    });

    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill="#242424" />
        {xMax > 8 &&
          series.map((d, i) => {
            const offset = i * yMax / 2;
            const curve = i % 2 == 0 ? curveMonotoneX : undefined;
            return (
              <Group key={`lines-${i}`} top={offset}>
                <LinePath
                  data={d}
                  xScale={xScale}
                  yScale={yScale}
                  x={x}
                  y={y}
                  stroke="#ffffff"
                  strokeWidth={1}
                  curve={curve}
                />
              </Group>
            );
          })}
      </Svg>
    );
  }
}

export default Lines;
