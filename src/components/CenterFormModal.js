import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Platform,
  Picker,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { updateCenter, createCenter } from "../actions/center";
import variables from "../assets/styles/variable";

class CenterForm extends Component {
  state = {
    facility: "",
    center: {
      name: "",
      description: "",
      location: "",
      state: {
        id: 0,
        name: ""
      },
      facilities: ["foo", "bar"],
      image: ""
    }
  };

  componentDidUpdate(prevProps) {
    // if (prevProps.isLoading && this.props.hasError && !this.props.isLoading) {
    //   Alert.alert("Error", this.props.errorMessage);
    // }
    // if (prevProps.isLoading && !this.props.hasError && !this.props.isLoading) {
    //   Alert.alert("Success", 'Check email for details', [
    //     {text: 'Login', onPress: () => this.props.navigation.navigate("Auth")}
    //   ]);
    // }
  }

  pickImage = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          center: { ...this.state.center, image: res.uri }
        });
      }
    });
  }

  onConfirm = () => {
    // this.props.createCenter(this.state.center);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={() => {
          this.props.onClose;
        }}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {this.props.edit ? "Update" : "Add"} Center
            </Text>
            <TextInput
              placeholder="Center name"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputBox}
              value={this.state.center.name}
              onChangeText={text =>
                this.setState({ center: { ...this.state.center, name: text } })
              }
            />
            <ImageBackground
              source={{uri: this.state.center.image || 'https://dummyimage.com/200x300&text=Center+Image!'}}
              style={styles.previewImage}>
                  <View style={styles.imgButtons}>
                      <TouchableOpacity
                      onPress={() => {
                        if (this.state.center.image !== "") {
                          this.setState({ center: { ...this.state.center, image: '' } })
                        }
                      }}
                    >
                      {this.state.center.image !== "" && <Icon
                        name="times-circle"
                        size={20}
                        color={variables.appGrey}
                      />}
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
                  center: { ...this.state.center, description: text }
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
                  center: { ...this.state.center, location: text }
                })
              }
            />
            <Picker
              mode="dropdown"
              selectedValue={this.state.center.state.id}
              onValueChange={(itemValue, _itemIndex) => this.setState({
                center: { ...this.state.center, state: {id: itemValue} }})}
              style={styles.dropdownz}
              itemStyle={styles.dropdownItem}
            >
            {
              this.props.allStates.map((option, _index) => {
                <Picker.Item label={option.name} value={option.id} />
              })
            }
            </Picker>
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
              onChangeText={text => this.setState({ facility: text })}
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
                  this.onConfirm();
                }}
              >
                <Text style={styles.buttonText}>
                  {this.props.edit ? "Update" : "Add"} Center
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={variables.primaryButtonClicked}
                style={[styles.button]}
                onPress={() => {
                  this.props.onClose();
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    isLoading: state.authentication.isResetLoading,
    hasError: state.authentication.hasError,
    errorMessage: state.authentication.errorMessage,
    allStates: state.center.allStates,
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
  modalBg: {
    marginTop: 22,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalTitle: {
    fontSize: 27,
    color: "#ffffff"
  },
  modalContent: {
    backgroundColor: variables.appGrey,
    padding: 30,
    borderRadius: 10,
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
  dropdown:{ height: 50, width: 100},
  dropdownItem:{color:'#000'},
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
  previewImage:{
    height: 200,
    width: 250,
    alignSelf: 'center',
  },
  imgButtons: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  imgUploadBtn: {
    backgroundColor: '#ffffff',
    padding: 5,
    width: '100%',
    alignContent: 'center'
  },
  imgUploadText:{
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
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
