import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Stop, Defs, LinearGradient } from "react-native-svg";
import * as Shape from "@vx/shape";
import { appleStock } from "@vx/mock-data";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max, bisector } from "d3-array";
import { timeFormat } from "d3-time-format";

const { width, height } = Dimensions.get("window");
const { AreaClosed, Line } = Shape;

const stock = appleStock.slice(800);
const formatDate = timeFormat("%b %d, '%y");

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;

class Areas extends Component {
  render() {
    const xMax = width;
    const yMax = height;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(stock, xStock),
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(stock, yStock) + yMax / 3],
      nice: true,
    });

    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill="#32deaa" />
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
          </LinearGradient>
        </Defs>
        <GridRows
          lineStyle={{ pointerEvents: "none" }}
          scale={yScale}
          width={xMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0.3)"
        />
        <GridColumns
          lineStyle={{ pointerEvents: "none" }}
          scale={xScale}
          height={yMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0.3)"
        />
        <AreaClosed
          data={stock}
          xScale={xScale}
          yScale={yScale}
          x={xStock}
          y={yStock}
          strokeWidth={1}
          stroke={"url(#gradient)"}
          fill={"url(#gradient)"}
          curve={curveMonotoneX}
        />
      </Svg>
    );
  }
}

export default Areas;
