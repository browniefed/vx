import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { Group } from "@vx/group";
import { BoxPlot } from "@vx/boxplot";
import { LinearGradient } from "@vx/gradient";
import { scaleBand, scaleLinear } from "@vx/scale";
import { genStats } from "@vx/mock-data";
import { extent } from "d3-array";
import { format } from "d3-format";

const { width, height } = Dimensions.get("window");
const data = genStats(5);
const twoDecimalFormat = format(".2f");

// accessors
const x = d => d.x;
const min = d => d.min;
const max = d => d.max;
const median = d => d.median;
const firstQuartile = d => d.firstQuartile;
const thirdQuartile = d => d.thirdQuartile;

class BoxPlotDemo extends Component {
  render() {
    // bounds
    const xMax = width;
    const yMax = height - 120;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4,
    });

    const values = data.reduce((r, e) => r.push(e.min, e.max) && r, []);
    const minYValue = Math.min(...values);
    const maxYValue = Math.max(...values);
    const yDomain = [minYValue - 0.1 * Math.abs(minYValue), maxYValue + 0.1 * Math.abs(minYValue)];

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [minYValue, maxYValue],
    });

    const boxWidth = xScale.bandwidth();
    const actualyWidth = Math.min(40, boxWidth);

    return (
      <Svg width={width} height={height}>
        <LinearGradient id="boxplot" to="#8b6ce7" from="#87f2d4" />
        <Rect x={0} y={0} width={width} height={height} fill={`url(#boxplot)`} />
        <Group top={40}>
          {data.map((d, i) => (
            <BoxPlot
              key={i}
              data={d}
              min={yScale(min(d))}
              max={yScale(max(d))}
              left={xScale(x(d))}
              firstQuartile={yScale(firstQuartile(d))}
              thirdQuartile={yScale(thirdQuartile(d))}
              median={yScale(median(d))}
              boxWidth={actualyWidth}
              fill="#FFFFFF"
              fillOpacity={0.3}
              stroke="#FFFFFF"
              strokeWidth={2}
              medianProps={{
                style: {
                  stroke: "white",
                },
              }}
            />
          ))}
        </Group>
      </Svg>
    );
  }
}

export default BoxPlotDemo;
