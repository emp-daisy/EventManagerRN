import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Text, TextInput, View, TouchableHighlight, Modal, StyleSheet, Platform, Alert } from "react-native";
import { forgottenPassword } from "../actions/authentication";
import variables from "../assets/styles/variable";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "Login",
      email: "",
    };
  }

  componentDidUpdate() {
    if (this.props.hasError && !this.props.isLoading) {
      Alert.alert("Error", this.props.errorMessage);
    }
    if (!this.props.hasError && !this.props.isLoading) {
      // Alert.alert("Success", 'Check email for details', [
      //   {text: 'Login', onPress: () => this.props.navigation.navigate("Auth")}
      // ]);
    }
  }

  resetPassword = () => {
    this.props.forgottenPassword(this.state.email);
  }

  checkFormInvalid = () => {
    const { email } = this.state;
    return email.length === 0
    || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);// eslint-disable-line no-useless-escape
  }

  render() {
    const isFormInvalid = this.checkFormInvalid();
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.isVisible}
          onRequestClose={() => {
            this.props.onClose;
          }}
        >
          <View style={{ marginTop: 22, flex: 1, alignItems: 'center',
            justifyContent: 'center' }}>
            <View style={{ backgroundColor: 'blue', padding: 30, borderRadius: 10, }}>
              <Text style={{ fontSize: 27 }}>Reset Password</Text>
              <TextInput
                placeholder="Email address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />

              <TouchableHighlight
                underlayColor={variables.primaryButtonClicked}
                style={[styles.button, isFormInvalid && styles.disabledButton]}
                disabled={isFormInvalid}
                onPress={() => {
                  this.resetPassword();
                }}
              >
                <Text>Send Email</Text>
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
        </Modal>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    isLoading: state.authentication.isLoading,
    hasError: state.authentication.hasError,
    errorMessage: state.authentication.errorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      forgottenPassword
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    backgroundColor: variables.inputBoxColor,
    borderRadius: variables.inputBoxRadius,
    marginVertical: 10,
    paddingHorizontal: 16,
    color: variables.inputTextColor,
    shadowOpacity: 0,
    fontSize: 16,
    ...Platform.select({
      ios: {
        height: 50
      }
    })
  },
  button: {
    width: 300,
    backgroundColor: variables.primaryButtonColor,
    borderRadius: variables.buttonRadius,
    marginVertical: 20,
    paddingVertical: 13,
    borderColor: variables.inputBoxColor,
    borderStyle: "solid",
    borderWidth: 1
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: variables.secondaryButtonColor,
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
)(ResetPassword);
