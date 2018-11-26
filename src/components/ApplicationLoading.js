import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ImageBackground, StyleSheet } from "react-native";
import { isUserAuthenticated } from "../actions/authentication";
import LoadingIcon from "./LoadingIcon";

class ApplicationLoading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.isUserAuthenticated();
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn && !this.props.isLoading) {
          this.props.navigation.navigate("App");
    }
    if (!this.props.isLoggedIn && !this.props.isLoading) {
      this.props.navigation.navigate("Auth");
    }
  }

  render() {
    return (
        <ImageBackground
          style={styles.backgroundImg}
          source={require("../assets/image/splash.png")} // eslint-disable-line global-require
        >
          <LoadingIcon loading />
        </ImageBackground>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    isLoggedIn: state.authentication.isLoggedIn,
    isLoading: state.authentication.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      isUserAuthenticated
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationLoading);
