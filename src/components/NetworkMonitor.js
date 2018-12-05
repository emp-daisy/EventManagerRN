import React, { Component } from "react";
import { NetInfo, View, Text, StyleSheet } from "react-native";

class NetworkMonitor extends Component {
  state = {
    isConnected: true
  };

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }
  render() {
      return (
        !this.state.isConnected && <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 50,
    transform: [{'translate': [0,0, 1]}]
  },
  offlineText: { color: "#fff" }
});

export default NetworkMonitor;
