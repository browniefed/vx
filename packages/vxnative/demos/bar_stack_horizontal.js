import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { cityTemperature } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { extent, max } from "d3-array";

const { width, height } = Dimensions.get("window");
const margin = {
  top: 40,
  left: 50,
  right: 40,
  bottom: 100,
};

const { BarStackHorizontal } = Shape;

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter(d => d !== "date");
const parseDate = timeParse("%Y%m%d");
const format = timeFormat("%b %d");
const formatDate = date => format(parseDate(date));

const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += +cur[k];
    return dailyTotal;
  }, 0);
  ret.push(t);
  return ret;
}, []);

class BarStackHorizontalDemo extends Component {
  render() {
    // accessors
    const y = d => d.date;
    const x = d => d.value;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // // scales
    const xScale = scaleLinear({
      rangeRound: [0, xMax],
      domain: [0, max(totals)],
      nice: true,
    });
    const yScale = scaleBand({
      rangeRound: [yMax, 0],
      domain: data.map(y),
      padding: 0.2,
      tickFormat: () => val => formatDate(val),
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: ["#6c5efb", "#c998ff", "#a44afe"],
    });

    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill="#eaedff" />
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal
            data={data}
            keys={keys}
            height={yMax}
            y={y}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
            onPress={data => event => {
              if (!events) return;
              alert(`clicked: ${JSON.stringify(data)}`);
            }}
          />
          <AxisLeft
            hideAxisLine={true}
            hideTicks={true}
            scale={yScale}
            stroke="#a44afe"
            tickStroke="#a44afe"
            tickLabelProps={(value, index) => ({
              fill: "#a44afe",
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
            })}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            stroke="#a44afe"
            tickStroke="#a44afe"
            tickLabelProps={(value, index) => ({
              fill: "#a44afe",
              fontSize: 11,
              textAnchor: "middle",
            })}
          />
        </Group>
      </Svg>
    );
  }
}

export default BarStackHorizontalDemo;
