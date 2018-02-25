import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as RNSvg from "react-native-svg";
import { buildInject } from "@vx/primitives";
import { StackNavigator } from "react-navigation";

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
import Trees from "./demos/trees"
import Dendogram from "./demos/dendogram";

buildInject(RNSvg);

const RootNav = StackNavigator(
  {
    Home,
    Lines,
    Bars,
    Areas,
    Dots,
    Patterns,
    StackedAreas,
    Glyphs,
    Axis,
    BarGroups,
    BarStack,
    HeatMap,
    LineRadial,
    Pie,
    Trees,
    Dendogram,
  },
  {
    headerMode: "none",
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
