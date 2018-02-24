import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as RNSvg from "react-native-svg";
import { buildInject } from "@vx/primitives";
import * as Shape from "@vx/shape";
buildInject(RNSvg);

const { width, height } = Dimensions.get("window");

const Svg = RNSvg.Svg;

console.log(Shape.Line);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg width={width} height={height}>
          <Shape.Line from={{ x: 0, y: 0 }} to={{ x: 100, y: 100 }} stroke="red" strokeWidth="2" />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
