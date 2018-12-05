import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dropdown } from 'react-native-material-dropdown';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { updateCenter, createCenter } from "../actions/center";
import variables from "../assets/styles/variable";
import LoadingIcon from "./LoadingIcon";
import { DUMMY_IMG } from "../actions/_constants";

class CenterForm extends Component {
  state = {
    facility: "",
    imageUri: "",
    center: {
      name: "Test IOS Center 2.0",
      description: "Created from IOS",
      location: "From my simulator",
      state: 25,
      facilities: ["foo", "bar"],
      image: ""
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && this.props.hasError && !this.props.isLoading) {
      Alert.alert("Error", `${this.props.errorMessage}\n${this.props.errorValidation}`);
    }
    if (prevProps.isLoading && !this.props.hasError && !this.props.isLoading) {
      Alert.alert("Success", 'Center added sucessfully', [
        {text: 'Ok', onPress: () => {
          this.props.navigation.state.params.refresh();
          this.props.navigation.goBack(null);
        }}
      ]);
    }
  }

  pickImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Pick an Image",
        mediaType: 'photo',
      },
      res => {
        if (!res.didCancel && !res.error) {
          this.setState({
            imageUri: res.uri,
            center: { ...this.state.center, image: `data:image/png;base64,${res.data}` }
          });
        }
      }
    );
  };

  onCreate = () => {
    this.props.createCenter(this.state.center);
  };

  checkFormInvalid = () => {
    const { email } = this.state;
    return (
      email.length === 0 ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ); // eslint-disable-line no-useless-escape
  };

  render() {
    const isFormInvalid = false; //this.checkFormInvalid();
    return (
      <ScrollView
        style={styles.contentBg}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.pageTitle}>
          {this.props.edit ? "Update" : "Add"} Center
        </Text>
        <TextInput
          placeholder="Center name"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputBox}
          value={this.state.center.name}
          onChangeText={text =>
            this.setState({ center: { ...this.state.center, name: text.trim() } })
          }
        />
        <ImageBackground
          source={{
            uri:
              this.state.imageUri || DUMMY_IMG
          }}
          style={styles.previewImage}
        >
          <View style={styles.imgButtons}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.center.image !== "") {
                  this.setState({
                    center: { ...this.state.center, image: "" }
                  });
                }
              }}
            >
              {this.state.center.image !== "" && (
                <Icon name="times-circle" size={20} color={variables.appGrey} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imgUploadBtn}
              onPress={this.pickImage}
            >
              <Text style={styles.imgUploadText}>Pick Image</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <TextInput
          placeholder="Description"
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          numberOfLines={4}
          style={styles.inputBox}
          value={this.state.center.description}
          onChangeText={text =>
            this.setState({
              center: { ...this.state.center, description: text.trim() }
            })
          }
        />
        <TextInput
          placeholder="Address"
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          numberOfLines={4}
          style={styles.inputBox}
          value={this.state.center.location}
          onChangeText={text =>
            this.setState({
              center: { ...this.state.center, location: text.trim().trim() }
            })
          }
        />
        <Dropdown
        label='State'
        value={this.state.center.state}
        data={this.props.allStates}
        labelExtractor={	({ name }) => name}
        valueExtractor={	({ id }) => id}
        onChangeText={(itemValue) =>
          {
            this.setState({
              center: { ...this.state.center, state: itemValue }
            })
          }
        }

        dropdownOffset={{top:5, left: 0}}
        containerStyle={styles.selectBox}
        inputContainerStyle={{ borderBottomColor: 'transparent' }}
        // overlayStyle={}
        // pickerStyle={}
        rippleInsets={{top: 6, bottom: -8}}
        rippleCentered={true}
      />
        <TextInput
          placeholder="Enter facilities"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyLabel="OK"
          returnKeyType="done"
          onSubmitEditing={() => {
            const facilities = this.state.center.facilities.concat(
              this.state.facility
            );
            this.setState({
              center: {
                ...this.state.center,
                facilities
              },
              facility: ""
            });
          }}
          style={styles.inputBox}
          value={this.state.facility}
          onChangeText={text => this.setState({ facility: text.trim() })}
        />
        <View style={styles.facilitiesList}>
          {this.state.center.facilities.map((facility, index) => {
            return (
              <View key={index.toString()} style={styles.pillView}>
                <Text style={styles.pillText}>{facility}</Text>
                <TouchableOpacity
                  style={styles.pillBtn}
                  onPress={() => {
                    this.state.center.facilities.splice(index, 1);
                    this.setState({
                      center: {
                        ...this.state.center,
                        facilities: this.state.center.facilities
                      }
                    });
                  }}
                >
                  <Icon
                    name="times-circle"
                    size={20}
                    color={variables.appGrey}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.buttonsGroup}>
          <TouchableHighlight
            underlayColor={variables.primaryButtonClicked}
            style={[styles.button, isFormInvalid && styles.disabledButton]}
            disabled={isFormInvalid}
            onPress={() => {
              this.onCreate();
            }}
          >
            <Text style={styles.buttonText}>
              {this.props.edit ? "Update" : "Add"} Center
            </Text>
          </TouchableHighlight>
        </View>

        <LoadingIcon loading={this.props.isLoading} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    isLoading: state.center.isCreating,
    hasError: state.center.hasError,
    errorMessage: state.center.errorMessage,
    errorValidation: state.center.errorValidation,
    allStates: state.center.allStates
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createCenter,
      updateCenter
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  contentBg: {
    paddingVertical: 22,
    flex: 1,
    backgroundColor: variables.appGrey
  },
  contentContainer: {
    // flexGrow: 1,
    // flex: 1,
    paddingBottom: 40,
    alignContent: "center",
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 27,
    color: "#ffffff"
  },
  facilitiesList: {
    flexWrap: "wrap",
    margin: 5,
    flexDirection: "row"
  },
  pillView: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    height: 30,
    borderRadius: 5,
    padding: 5,
    margin: 5
  },
  pillText: {
    color: variables.appGrey,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: 5
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
        minHeight: 50,
        paddingTop: 15,
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
  previewImage: {
    height: 200,
    width: 250,
    alignSelf: "center"
  },
  imgButtons: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    backgroundColor: "transparent"
  },
  imgUploadBtn: {
    backgroundColor: "#ffffff",
    padding: 5,
    width: "100%",
    alignContent: "center"
  },
  imgUploadText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center"
  },
  buttonsGroup: {
    flexDirection: "row",
    justifyContent: "center"
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterForm);
