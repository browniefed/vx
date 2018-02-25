import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Shape from "@vx/shape";
import { GradientTealBlue, RadialGradient } from "@vx/gradient";
import { Mercator } from "@vx/geo";
import * as topojson from "topojson-client";
import topology from "../world-topo.json";

const { width, height } = Dimensions.get("window");

class GeoDemo extends Component {
  render() {
    const world = topojson.feature(topology, topology.objects.units);
    return (
      <Svg width={width} height={height}>
        <RadialGradient id="geo_mercator_radial" from="#55bdd5" to="#4f3681" r={"80%"} />
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#geo_mercator_radial)`}
        />
        <Mercator
          data={world.features}
          scale={width / 630 * 100}
          translate={[width / 2, height / 2 + 50]}
          fill={() => "#8be4c5"}
          stroke={() => "#5fcfa7"}
          onPress={data => event => {
            alert(`Clicked: ${data.properties.name} (${data.id})`);
          }}
        />
      </Svg>
    );
  }
}

export default GeoDemo;
