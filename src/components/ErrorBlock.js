import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import variables from "../assets/styles/variable";

class ErrorBlock extends Component {
  render() {
      return (
        this.props.isVisible && <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.props.message} TESTING !@$</Text>
          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={() => {
              if(this.props.onRefresh){
                this.props.onRefresh();
              }
            }}
          >
            <Icon name="refresh" size={25} color='#ffffff' />
          </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#b52424",
    minHeight: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 5,
    position: "absolute",
    bottom: 0,
    transform: [{'translate': [0,0, 1]}]
  },
  errorText: {
    flex:0.8,
    color: "#fff",
  },
  refreshBtn: {
    flex:0.2,
    // justifyContent: "center",
    alignItems: "flex-end",
   }
});

export default ErrorBlock;
