import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import variables from "../assets/styles/variable";

const styles = StyleSheet.create({
  overlayBackground: {
    backgroundColor: variables.loadingIconBg,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent:'center',
    alignItems:'center',
    zIndex: 1,
    opacity: 0.5,
  },
});

const LoadingIcon = props => {
  const { loading } = props;
  return (
      loading && <View style={styles.overlayBackground}>
          <ActivityIndicator
            animating
            color={variables.loaderColor}
            size="large"
          />
      </View>
  );
};

export default LoadingIcon;
