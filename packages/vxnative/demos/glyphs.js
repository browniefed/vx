import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, G } from "react-native-svg";
import { Group } from "@vx/group";
import { GlyphDot } from "@vx/glyph";
import { LinePath } from "@vx/shape";
import { genDateValue } from "@vx/mock-data";
import { scaleTime, scaleLinear } from "@vx/scale";
import { curveBasis, curveMonotoneX } from "@vx/curve";
import { extent, max, min } from "d3-array";

const { width, height } = Dimensions.get("window");
const data = genDateValue(15);

// accessors
const x = d => d.date;
const y = d => d.value;

class Glphys extends Component {
  render() {
    const xMax = width;
    const yMax = height;

    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x),
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(data, y)],
      nice: true,
    });

    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill="#00f2ff" rx={14} />
        <Group>
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke="#7e20dc"
            strokeWidth={2}
            strokeDasharray="2,2"
            curve={curveBasis}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke="#7e20dc"
            strokeWidth={3}
            curve={curveMonotoneX}
            glyph={(d, i) => {
              return (
                <G key={`line-point-${i}`}>
                  <GlyphDot
                    cx={xScale(x(d))}
                    cy={yScale(y(d))}
                    r={6}
                    fill="#fff"
                    stroke="#01f2ff"
                    strokeWidth={10}
                  />
                  <GlyphDot
                    cx={xScale(x(d))}
                    cy={yScale(y(d))}
                    r={6}
                    fill="#01f2ff"
                    stroke="#7e20dc"
                    strokeWidth={3}
                  />
                  <GlyphDot cx={xScale(x(d))} cy={yScale(y(d))} r={4} fill="#ffffff" />
                </G>
              );
            }}
          />
        </Group>
      </Svg>
    );
  }
}

export default Glphys;
