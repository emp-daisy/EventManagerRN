import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { getCenters, getStates } from "../actions/center";
import LoadingIcon from "./LoadingIcon";
import ErrorBlock from "./ErrorBlock";
import variables from "../assets/styles/variable";

class Centers extends Component {
  state = {
    viewDetails: false,
    centerData: {},
    showCenterForm: false
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.getCenters();
    this.props.getStates();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Available Centers</Text>
        <LoadingIcon loading={this.props.isLoading} />
        {this.props.allCenterList.length === 0 ? (
          <View>
            <Text style={styles.notFound}>No center available</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={this.props.allCenterList}
              keyExtractor={(item, _index) => item.id.toString()}
              contentContainerStyle={{paddingBottom: 40,}}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.centerName}>{item.name}</Text>
                  <Text style={styles.centerLocation}>
                    {item.location}, {item.state}
                  </Text>
                  <Text style={styles.centerFacilities}>
                    {item.facilities.toString()}
                  </Text>
                  <Text
                    onPress={() =>
                      this.props.navigation.navigate("CenterDetails", {
                        center: item
                      })
                    }
                    style={styles.viewBtn}
                  >
                    View details
                  </Text>
                </View>
              )}
            />
          </View>
        )}
        {this.props.isRoleAdmin !== null && <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => {
            this.props.navigation.navigate("CenterForm", {
              refresh: () => this.loadData()
            })
          }}
        >
          <Icon name="plus" size={30} color={variables.appGrey} />
        </TouchableOpacity>}

        <ErrorBlock
          isVisible={this.props.hasError}
          message={this.props.errorMessage}
          onRefresh={()=>this.loadData()}
        />
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
    isRoleAdmin: state.authentication.isRoleAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCenters,
      getStates
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    height: "100%"
  },
  listContainer: {
    margin: 10
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10
  },
  notFound: {
    fontSize: 13,
    fontWeight: "normal",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10
  },
  card: {
    padding: 15,
    margin: 15,
    minHeight: 100,
    backgroundColor: "#343a40",
    borderRadius: 10
  },
  centerName: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16
  },
  centerLocation: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 13,
    alignSelf: "center"
  },
  centerFacilities: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 15,
    alignSelf: "flex-end"
  },
  viewBtn: {
    alignSelf: "flex-end",
    borderColor: "#ffffff",
    borderWidth: 3,
    padding: 10,
    color: "#ffffff"
  },
  floatingBtn: {
    borderWidth: 5,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 100
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Centers);
