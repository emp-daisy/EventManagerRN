import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import { DrawerItems } from "react-navigation";
import { logout } from "../actions/authentication";
import LoadingIcon from "./LoadingIcon";

class SideDrawer extends Component {
  componentDidUpdate() {
    if (!this.props.isLoading && !this.props.isLoggedIn) {
      this.props.navigation.navigate("Auth");
    }
  }
  logout = () => {
    Alert.alert(
      "Log out",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          }
        },
        {
          text: "Confirm",
          onPress: () => {
            this.props.logout();
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <DrawerItems {...this.props}/>
        </ScrollView>
        <View>
          <TouchableOpacity onPress={() => this.logout() }  >
            <Text style={styles.logOutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <LoadingIcon loading={this.props.isLoading}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.authentication.isLoading,
    isLoggedIn: state.authentication.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  logOutText:{
    fontWeight: "bold",
    color: "#000000",
    fontSize: 15,
    padding: 10,
    margin: 5,
    borderRadius: 2,
    borderColor: '#343a40',
    borderWidth: 1,
    textAlign: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
