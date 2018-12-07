import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getCenters, deleteCenter, resetCenterStore } from "../actions/center";
import ErrorBlock from "./ErrorBlock";
import { DUMMY_IMG } from "../actions/_constants";
import variables from "../assets/styles/variable";
import LoadingIcon from "./LoadingIcon";

class CenterDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
            style={{marginHorizontal: 10,}}
            onPress={() => {
              navigation.state.params.deleteCenter()
            }}
          >
            <Icon name="trash" size={30} color={variables.appGrey} />
          </TouchableOpacity>
      ),
    };
  };

  state = {
    centerId: undefined,
    viewDetails: false,
    center: undefined,
  };

  componentDidMount() {
    this.setState({
      center:this.props.navigation.state.params.center,
      centerId:this.props.navigation.state.params.center.id
    });

    this.props.navigation.setParams({
      deleteCenter: this.deleteCenter
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && prevProps.allCenterList !== this.props.allCenterList && !this.props.isLoading) {
      this.props.navigation.goBack(null);
    }
  }

  componentWillUnmount () {
    this.props.resetCenterStore();
  }

  loadData = () => {
    const center = this.props.allCenterList.filter(center => {
        return center.id.toString()  === this.state.centerId.toString() ;
      })[0];
    this.setState({ center });
  }

  deleteCenter = () => {
    Alert.alert("Confirmation", "Sure you want this center?", [
      {text: 'Yes', onPress: () => {this.props.deleteCenter(this.state.centerId);}},
      {text: 'No', onPress: () => {}},
    ]);
  }

  render() {
    const { center } = this.state;
    return (
      center !== undefined && <View style={styles.container}>
          <Image source={{uri: center.image || DUMMY_IMG}}
        style={{width: 400, height: 400, resizeMode: 'cover',}} />

          <Text style={styles.pageTitle}>{center.name}</Text>

          <Text style={styles.centerLocation}>{center.location}, {center.state}</Text>

          <Text style={styles.centerFacilities}>{center.facilities.toString()}</Text>

          <TouchableOpacity
            style={variables.floatingBtn}
            onPress={() => {
              this.props.navigation.navigate("CenterForm", {
                edit: true,
                center,
                refresh: () => this.loadData()
              })
            }}
          >
            <Icon name="pencil" size={30} color={variables.appGrey} />
          </TouchableOpacity>
        <ErrorBlock isVisible={this.props.hasError} message={this.props.errorMessage} />

        <LoadingIcon loading={this.props.isLoading} />
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
      deleteCenter,
      resetCenterStore
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
