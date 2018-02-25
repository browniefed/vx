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
