import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Circle } from "react-native-svg";
import * as Shape from "@vx/shape";
import { extent } from "d3-array";
import { Group } from "@vx/group";
import { GradientOrangeRed, GradientPinkRed } from "@vx/gradient";
import * as ClipPath from "@vx/clip-path";
import { scaleLinear } from "@vx/scale";
import { voronoi, VoronoiPolygon } from "@vx/voronoi";

const { RectClipPath } = ClipPath;
const { width, height } = Dimensions.get("window");
const margin = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};
const neighborRadius = 50;

const data = Array(150)
  .fill(null)
  .map(() => ({
    x: Math.random(),
    y: Math.random(),
    id: Math.random()
      .toString(36)
      .slice(2),
  }));

class VoronoiChart extends Component {
  static getUpdatedState(props) {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear({
      domain: extent(data, d => d.x),
      range: [0, innerWidth],
    });

    const yScale = scaleLinear({
      domain: extent(data, d => d.y),
      range: [innerHeight, 0],
    });

    const voronoiDiagram = voronoi({
      x: d => xScale(d.x),
      y: d => yScale(d.y),
      width: innerWidth,
      height: innerHeight,
    })(data);

    return {
      selected: null,
      selectedNeighbors: null,
      xScale,
      yScale,
      voronoiDiagram,
      innerWidth,
      innerHeight,
    };
  }
  constructor(props) {
    super(props);
    this.state = VoronoiChart.getUpdatedState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      this.setState(VoronoiChart.getUpdatedState(nextProps));
    }
  }
  render() {
    const {
      voronoiDiagram,
      innerWidth,
      innerHeight,
      xScale,
      yScale,
      selected,
      neighbors,
    } = this.state;

    const polygons = voronoiDiagram.polygons();

    return (
      <Svg width={width} height={height}>
        <GradientOrangeRed id="voronoi_orange_red" />
        <GradientPinkRed id="voronoi_pink_red" />
        <RectClipPath id="voronoi_clip" width={innerWidth} height={innerHeight} />
        <Group top={margin.top} left={margin.left} clipPath="url(#voronoi_clip)">
          {polygons.map(polygon => (
            <VoronoiPolygon
              polygon={polygon}
              fill={d =>
                selected && (d.id === selected.data.id || neighbors[d.id])
                  ? "url(#voronoi_orange_red)"
                  : "url(#voronoi_pink_red)"
              }
              fillOpacity={d => (neighbors && neighbors[d.id] ? 0.4 : 1)}
              stroke="#fff"
              strokeWidth={1}
            />
          ))}
          {data.map((d, i) => (
            <Circle
              key={i}
              r={2}
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              fill="#ffffff"
              fillOpacity={0.5}
            />
          ))}
        </Group>
      </Svg>
    );
  }
}

export default VoronoiChart;
