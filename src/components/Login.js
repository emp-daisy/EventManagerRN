import React, { Component } from "react";
import LoadingIcon from "./LoadingIcon";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert
} from "react-native";
import { login } from "../actions/authentication";
import variables from "../assets/styles/variable";
import ResetPassword from "./ResetPassword";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      resetPasswordActive: false
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.hasError && this.props.hasError) {
      Alert.alert("Error", this.props.errorMessage);
    }
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.navigation.navigate("App");
    }
  }

  logIn = () => {
    this.props.login(this.state.email, this.state.password);
  };

  checkFormInvalid = () => {
    const { email, password } = this.state;
    return (
      email.length === 0 ||
      password.length === 0 ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ); // eslint-disable-line no-useless-escape
  };

  render() {
    const { navigation } = this.props;
    const isFormInvalid = this.checkFormInvalid();
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Login</Text>

        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          placeholderTextColor={variables.inputTextColor}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor={variables.inputTextColor}
          autoCorrect={false}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />

        <TouchableHighlight
          underlayColor={variables.primaryButtonClicked}
          style={[styles.button, isFormInvalid && styles.disabledButton]}
          disabled={isFormInvalid}
          onPress={this.logIn}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        <Text
          style={styles.linkText}
          onPress={() => {
            this.setState({ resetPasswordActive: true });
          }}
        >
          Forgotten password?
        </Text>

        <Text
          style={styles.linkText}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Don't have an account? Register now
        </Text>

        <ResetPassword
          isVisible={this.state.resetPasswordActive}
          onClose={() => {
            this.setState({ resetPasswordActive: false });
          }}
        />

        <LoadingIcon loading={this.props.isLoading} />
      </View>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    isLoggedIn: state.authentication.isLoggedIn,
    isLoading: state.authentication.isLoading,
    hasError: state.authentication.hasError,
    errorMessage: state.authentication.errorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 30
  },
  linkText: {
    color: variables.primaryTextColor,
    textDecorationLine: "underline",
    textAlign: "right",
    fontSize: 16,
    marginVertical: 5
  },
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
)(Login);
