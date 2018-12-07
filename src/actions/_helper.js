import {
  AsyncStorage
} from "react-native";
import {
  ERROR_MESSAGE, AUTH_TOKEN
} from "./_constants";

const getErrorMessage = (errorObject) => {
  let message, validationError;

  if (typeof errorObject === "undefined") {
    message =  ERROR_MESSAGE;
  }
  else if(errorObject &&  typeof errorObject.data.msg === 'object'){
    message = "Validation failed";
    validationError = Object.values(errorObject.data.msg).join('\n');
  }
  else{
    message = errorObject.data.msg;
  }

  return {
    message,
    validationError,
  };
}

const getUserToken = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

const addUserToken = async token => {
  await AsyncStorage.setItem(AUTH_TOKEN, token);
  return;
};

const removeUserToken = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN);
  return;
};

export {
  getUserToken,
  addUserToken,
  removeUserToken,
  getErrorMessage,
};