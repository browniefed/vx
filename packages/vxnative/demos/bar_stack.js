import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Shape from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom } from "@vx/axis";
import { cityTemperature } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { extent, max } from "d3-array";

const { width, height } = Dimensions.get("window");
const { BarStack } = Shape;

const data = cityTemperature.slice(0, 12);

const keys = Object.keys(data[0]).filter(d => d !== "date");
const parseDate = timeParse("%Y%m%d");
const format = timeFormat("%b %d");
const formatDate = date => format(parseDate(date));

// accessors
const x = d => d.date;
const y = d => d.value;

const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += +cur[k];
    return dailyTotal;
  }, 0);
  ret.push(t);
  return ret;
}, []);

const margin = {
  top: 40,
};

// yScale is getting set at a func instead of 0 for the y Rect

class BarStacks extends Component {
  render() {
    // bounds
    const xMax = width;
    const yMax = height - margin.top - 100;

    // // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.2,
      tickFormat: () => val => formatDate(val),
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      nice: true,
      domain: [0, max(totals)],
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: ["#6c5efb", "#c998ff", "#a44afe"],
    });

    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill="#eaedff" />
        <BarStack
          top={margin.top}
          data={data}
          keys={keys}
          height={yMax}
          x={x}
          xScale={xScale}
          yScale={yScale}
          zScale={zScale}
          onPress={data => event => {
            if (!events) return;
            alert(`clicked: ${JSON.stringify(data)}`);
          }}
        />
        <AxisBottom
          scale={xScale}
          top={yMax + margin.top}
          stroke="#a44afe"
          tickStroke="#a44afe"
          tickLabelProps={(value, index) => ({
            fill: "#a44afe",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </Svg>
    );
  }
}

export default BarStacks;
