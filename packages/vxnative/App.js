import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as RNSvg from "react-native-svg";
import { buildInject } from "@vx/primitives";
import { TabNavigator } from "react-navigation";

import Home from "./select";
import Lines from "./demos/lines";
import Bars from "./demos/bars";
import Areas from "./demos/areas";
import Dots from "./demos/dots";
import Patterns from "./demos/patterns";
import StackedAreas from "./demos/stacked_areas";
import Glyphs from "./demos/glyphs";
import Axis from "./demos/axis";
import BarGroups from "./demos/bar_groups";
import BarStack from "./demos/bar_stack";
import HeatMap from "./demos/heatmap";
import LineRadial from "./demos/lineradial";
import Pie from "./demos/pies";
import Trees from "./demos/trees";
import Dendogram from "./demos/dendogram";
import Voronoi from "./demos/voronoi";
import BoxPlot from "./demos/boxplot";
import Geo from "./demos/geo";
import Network from "./demos/network";
import Pack from "./demos/pack";
import BarStackHorizontal from "./demos/bar_stack_horizontal";
import LinkTypes from "./demos/link_types";
import Radar from "./demos/radar";
import Treemap from "./demos/treemap";
import DragOne from "./demos/drag_one";

buildInject(RNSvg);

const RootNav = TabNavigator(
  {
    // Home,
    Lines,
    Bars,
    Areas,
    Dots,
    // Patterns,
    // StackedAreas,
    Glyphs,
    Axis,
    BarGroups,
    BarStack,
    HeatMap,
    LineRadial,
    Pie,
    Trees,
    Dendogram,
    Voronoi,
    // BoxPlot,
    Geo,
    Network,
    Pack,
    BarStackHorizontal,
    Radar,
    Treemap,
    // LinkTypes,
    // DragOne
  },
  {
    headerMode: "none",
    swipeEnabled: true,
    animationEnabled: true,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
