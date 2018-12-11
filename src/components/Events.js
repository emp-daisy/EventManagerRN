import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from "react-native";
import { getUserEvent } from "../actions/events";
import LoadingIcon from "./LoadingIcon";
import ErrorBlock from "./ErrorBlock";
import variables from "../assets/styles/variable";
import EventForm from "./EventForm";

class Events extends Component {
  state = {
    viewDetails: false,
    isCreating: false
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.getUserEvent();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Available Events</Text>
        <LoadingIcon loading={this.props.isLoading} />
        {this.props.eventList.length === 0 ? (
          <View>
            <Text style={styles.notFound}>No event available</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={this.props.eventList}
              keyExtractor={(item, _index) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 40 }}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.eventName}>{item.name}</Text>
                  <Text style={styles.eventDate}>
                    Starting: {new Date(item.startDate).toLocaleString()}
                  </Text>
                  <Text style={styles.eventDate}>
                    Ending: {new Date(item.endDate).toDateString()}
                  </Text>
                  <Text
                    onPress={() =>
                      this.props.navigation.navigate("EventDetails", {
                        event: item
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
        {this.props.isRoleAdmin !== null && (
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={() => {
              this.setState({ isCreating: true });
            }}
          >
            <Icon name="plus" size={30} color={variables.appGrey} />
          </TouchableOpacity>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isCreating}
          onRequestClose={() => {
            this.setState({ isCreating: false });
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <EventForm onClose={() => this.setState({ isCreating: false })} />
          </View>
        </Modal>

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
    isLoading: state.event.isLoading,
    hasError: state.event.hasError,
    errorMessage: state.event.errorMessage,
    eventList: state.event.eventList,
    isRoleAdmin: state.authentication.isRoleAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserEvent
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
  eventName: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16
  },
  eventDate: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 13,
    alignSelf: "center"
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
)(Events);
