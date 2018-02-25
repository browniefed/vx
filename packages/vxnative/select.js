import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";

const screens = [
  "Lines",
  "Bars",
  "Dots",
  "Patterns",
  "Areas",
  "Glyphs",
  "StackedAreas",
  "Axis",
  "BarGroups",
  "BarStack",
  "HeatMap",
  "LineRadial",
  "Pie",
  "Trees",
  "Dendogram",
  "Voronoi",
  "BoxPlot",
  "Geo",
];

class Select extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {screens.map(item => {
          return (
            <TouchableOpacity key={item} onPress={() => this.props.navigation.navigate(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
});

export default Select;
