import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-material-dropdown";
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  updateEvent,
  createEvent,
  resetEventStore
} from "../actions/events";
import { getCenters } from "../actions/center";
import variables from "../assets/styles/variable";
import LoadingIcon from "./LoadingIcon";

class EventForm extends Component {
  state = {
    isEditing: false,
    isDateTimePickerVisible: false,
    dateSetting: undefined,
    event: {
      name: "",
      startDate: "",
      endDate: "",
      location: undefined
    }
  };

  componentDidMount() {
    this.props.getCenters();
    if (this.props.edit) {
      this.setState({
        isEditing: this.props.edit,
        event: {
          ...this.props.event,
          startDate: moment(this.props.event.startDate).format("DD-MM-YYYY HH:mm").toString(),
          endDate: moment(this.props.event.endDate).format("DD-MM-YYYY HH:mm").toString(),
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.resetEventStore();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && this.props.hasError && !this.props.isLoading) {
      Alert.alert(
        "Error",
        `${this.props.errorMessage}\n${this.props.errorValidation || ""}`
      );
    }
    if (prevProps.isLoading && !this.props.hasError && !this.props.isLoading) {
      Alert.alert(
        "Success",
        `Event ${this.state.isEditing ? "updated" : "added"} sucessfully`,
        [
          {
            text: "Ok",
            onPress: () => {
              if(this.props.refresh) {
                this.props.refresh();
              }
              this.props.onClose();
            }
          }
        ]
      );
    }
  }

  onCreate = () => {
    this.props.createEvent(this.state.event);
  };

  onUpdate = () => {
    this.props.updateEvent(this.state.event.id, this.state.event);
  };

  showDateTimePicker = state => {
    this.setState({ isDateTimePickerVisible: true, dateSetting: state });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false, dateSetting: undefined });
  };

  handleDatePicked = date => {
    this.setState({
      event: {
        ...this.state.event,
        [this.state.dateSetting]: moment(date)
          .format("DD-MM-YYYY HH:mm")
          .toString()
      }
    });
    this.hideDateTimePicker();
  };

  checkFormInvalid = () => {
    const { name, startDate, endDate, location } = this.state.event;
    return (
      name.length === 0 ||
      startDate === "" ||
      endDate === "" ||
      location === undefined
    );
  };

  render() {
    const isFormInvalid = this.checkFormInvalid();
    return (
      <View
        style={styles.contentBg}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.buttonClose}>
          <TouchableHighlight
            underlayColor={variables.primaryButtonClicked}
            onPress={() => {
              this.props.onClose();
            }}
          >
            <Icon name="close" size={30} color={"#ffffff"} />
          </TouchableHighlight>
        </View>
        <Text style={styles.pageTitle}>
          {this.state.isEditing ? "Update" : "Add"} Event
        </Text>
        <TextInput
          placeholder="Event name"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputBox}
          value={this.state.event.name}
          onChangeText={text =>
            this.setState({ event: { ...this.state.event, name: text } })
          }
          // onEndEditing={(_event, text) =>
          //   this.setState({
          //     event: { ...this.state.event, name: text.trim() }
          //   })
          // }
        />
        <TextInput
          placeholder="Start Date"
          editable={false}
          style={[styles.inputBox]}
          value={this.state.event.startDate}
          onTouchStart={() => this.showDateTimePicker("startDate")}
          onChangeText={text =>
            this.setState({
              event: { ...this.state.event, startDate: text.trim() }
            })
          }
        />
        {this.state.event.startDate !== "" && (
          <TextInput
            placeholder="End Date"
            editable={false}
            style={[styles.inputBox]}
            value={this.state.event.endDate}
            onTouchStart={() => this.showDateTimePicker("endDate")}
            onChangeText={text =>
              this.setState({
                event: { ...this.state.event, endDate: text.trim() }
              })
            }
          />
        )}
        <Dropdown
          label="Center"
          value={this.state.event.location}
          data={this.props.allCenterList}
          labelExtractor={({ name }) => name}
          valueExtractor={({ id }) => id}
          onChangeText={itemValue => {
            this.setState({
              event: { ...this.state.event, location: itemValue }
            });
          }}
          containerStyle={styles.selectBox}
          inputContainerStyle={styles.dropdownContainer}
          overlayStyle={styles.dropdownPickerOverlay}
          itemTextStyle={styles.dropdownItemTextStyle}
          rippleInsets={{ top: 6, bottom: -8 }}
          rippleCentered={true}
          dropdownMargins={{ min: 40, max: 45 }}
          dropdownOffset={{ left: 0, top: 10 }}
          dropdownPosition={0}
          itemCount={5}
        />
        <View style={styles.buttonsGroup}>
          <TouchableHighlight
            underlayColor={variables.primaryButtonClicked}
            style={[styles.button, isFormInvalid && styles.disabledButton]}
            disabled={isFormInvalid}
            onPress={() => {
              this.state.isEditing ? this.onUpdate() : this.onCreate();
            }}
          >
            <Text style={styles.buttonText}>
              {this.state.isEditing ? "Update" : "Add"} Event
            </Text>
          </TouchableHighlight>
        </View>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode="datetime"
          minimumDate={
            this.state.dateSetting === "startDate"
              ? new Date()
              : new Date(this.state.event.startDate)
          }
          is24Hour={true}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />

        <LoadingIcon loading={this.props.isLoading} />
      </View>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    isLoading: state.event.isCreating,
    hasError: state.event.hasError,
    errorMessage: state.event.errorMessage,
    errorValidation: state.event.errorValidation,
    allCenterList: state.center.allCenterList
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createEvent,
      getCenters,
      updateEvent,
      resetEventStore
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  contentBg: {
    paddingVertical: 22,
    backgroundColor: variables.appGrey,
    alignItems: "center"
  },
  contentContainer: {
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 27,
    color: "#ffffff"
  },
  dropdown: { height: 50, width: 100 },
  dropdownItem: { color: "#000" },
  inputBox: {
    width: 300,
    backgroundColor: "#ffffff",
    borderRadius: variables.inputBoxRadius,
    marginVertical: 10,
    paddingHorizontal: 16,
    color: "#000000",
    shadowOpacity: 0,
    fontSize: 16,
    ...Platform.select({
      ios: {
        minHeight: 50
      }
    })
  },
  selectBox: {
    width: 300,
    backgroundColor: "#ffffff",
    borderRadius: variables.inputBoxRadius,
    marginVertical: 10,
    paddingHorizontal: 16,
    shadowOpacity: 0,
    ...Platform.select({
      ios: {
        // minHeight: 50
      }
    })
  },
  buttonsGroup: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonClose: {
    alignSelf: "flex-start",
    margin: 10
  },
  button: {
    width: "45%",
    backgroundColor: variables.primaryButtonColor,
    borderRadius: 0,
    margin: 10,
    padding: 13,
    borderColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },
  disabledButton: {
    opacity: 0.5,
    borderWidth: 0
  },
  dropdownContainer: { borderBottomColor: "transparent" },
  dropdownPickerOverlay: {
    marginTop: 30
  },
  dropdownItemTextStyle: {
    fontSize: 15
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
