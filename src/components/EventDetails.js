import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Modal, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getUserEvent, deleteEvent, resetEventStore } from "../actions/events";
import ErrorBlock from "./ErrorBlock";
import { DUMMY_IMG } from "../actions/_constants";
import variables from "../assets/styles/variable";
import LoadingIcon from "./LoadingIcon";
import EventForm from "./EventForm";

class EventDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        navigation.state.params.isRoleAdmin !== null &&
        <TouchableOpacity
            style={{marginHorizontal: 10,}}
            onPress={() => {
              navigation.state.params.deleteEvent()
            }}
          >
            <Icon name="trash" size={30} color={variables.appGrey} />
          </TouchableOpacity>
      ),
    };
  };

  state = {
    isEditing: false,
    eventId: undefined,
    viewDetails: false,
    eventId: undefined,
    event: undefined,
  };

  componentDidMount() {
    this.setState({
      event:this.props.navigation.state.params.event,
      eventId:this.props.navigation.state.params.event.id
    });

    this.props.navigation.setParams({
      deleteEvent: this.deleteEvent,
      isRoleAdmin: this.props.isRoleAdmin
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && prevProps.eventList !== this.props.eventList && !this.props.isLoading) {
      this.props.navigation.goBack(null);
    }
  }

  componentWillUnmount () {
    this.props.resetEventStore();
  }

  loadData = () => {
    const event = this.props.eventList.filter(event => {
        return event.id.toString()  === this.state.eventId.toString() ;
      })[0];
    this.setState({ event });
  }

  deleteEvent = () => {
    Alert.alert("Confirmation", "Sure you want this event?", [
      {text: 'Yes', onPress: () => {this.props.deleteEvent(this.state.eventId);}},
      {text: 'No', onPress: () => {}},
    ]);
  }

  render() {
    const { event } = this.state;
    return (
      event !== undefined && <View style={styles.container}>
         <Text style={styles.eventHeading}>Event</Text>
         <Text style={styles.eventTitle}>{event.name}</Text>

         <Text style={styles.eventHeading}>Time</Text>
         <Text style={styles.eventDate}>From: {new Date(event.startDate).toLocaleString()}</Text>
         <Text style={styles.eventDate}>To: {new Date(event.endDate).toDateString()}</Text>

         <Text style={styles.eventHeading}>Location</Text>
          <Text style={styles.eventLocation}>{event.centerName},</Text>
          <Text style={styles.eventLocation}>{event.centerLocation}, {event.state}</Text>

          {this.props.isRoleAdmin!==null && <TouchableOpacity
            style={variables.floatingBtn}
            onPress={() => this.setState({ isEditing: true }) }
          >
            <Icon name="pencil" size={30} color={variables.appGrey} />
          </TouchableOpacity>}
        <ErrorBlock
          isVisible={this.props.hasError}
          message={this.props.errorMessage}
          onRefresh={()=>this.loadData()}
       />


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isEditing}
          onRequestClose={() => {
            this.setState({ isEditing: false });
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <EventForm
            onClose={() => this.setState({ isEditing: false })}
            refresh={()=>this.loadData}
            edit={true}
            event={event}/>
          </View>
        </Modal>

        <LoadingIcon loading={this.props.isLoading} />
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
      getUserEvent,
      deleteEvent,
      resetEventStore
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  eventHeading:{
    fontSize: 20,
    color: '#000000',
    marginVertical: 20,
  },
  eventTitle:{
    fontSize: 18,
    color: '#000000',
    fontWeight: "bold",
    alignItems: 'center',
    alignSelf: "center",
  },
  eventName: {
    fontWeight: "bold",
    color: '#000000',
    fontSize: 16,
  },
  eventLocation:{
    color: '#000000',
    marginVertical: 10,
    fontSize: 16,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails);
