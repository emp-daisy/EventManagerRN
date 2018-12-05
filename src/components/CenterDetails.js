import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Image, Text, StyleSheet } from "react-native";
import { getCenters } from "../actions/center";
import LoadingIcon from "./LoadingIcon";
import ErrorBlock from "./ErrorBlock";
import { DUMMY_IMG } from "../actions/_constants";

class CenterDetails extends Component {
  state = {
    viewDetails: false,
    centerData: {},
  };

  componentDidMount() {
    this.props.getCenters();
  }
  render() {
    const { center } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
      <Image source={{uri: center.image || DUMMY_IMG}}
       style={{width: 400, height: 400, resizeMode: 'cover',}} />

        <Text style={styles.pageTitle}>{center.name}</Text>

        <Text style={styles.centerLocation}>{center.location}, {center.state}</Text>

        <Text style={styles.centerFacilities}>{center.facilities.toString()}</Text>

        <ErrorBlock isVisible={this.props.hasError} message={this.props.errorMessage} />
      </View>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    isLoading: state.center.isLoading,
    hasError: state.center.hasError,
    errorMessage: state.center.errorMessage,
    allCenterList: state.center.allCenterList,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCenters,
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
    // margin: 20,
  },
  pageTitle:{
    fontSize: 20,
    fontWeight: "bold",
    alignItems: 'center',
    alignSelf: "center",
    marginVertical: 10,
  },
  centerName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  centerLocation:{
    marginVertical: 10,
    fontSize: 13,
  },
  centerFacilities:{
    marginVertical: 10,
    fontSize: 15,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterDetails);
