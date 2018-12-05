import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class ErrorBlock extends Component {
  render() {
      return (
        this.props.isVisible && <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.props.message}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    transform: [{'translate': [0,0, 1]}]
  },
  errorText: { color: "#fff", margin: 3, }
});

export default ErrorBlock;
