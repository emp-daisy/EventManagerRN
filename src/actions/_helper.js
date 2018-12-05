import {
  AsyncStorage
} from "react-native";
import {
  ERROR_MESSAGE, AUTH_TOKEN
} from "./_constants";

const errorMessage = (errorObj) => {
  if (typeof errorObj === "undefined") {
    return ERROR_MESSAGE;
  }
  return errorObj;
}

const validationResult = (error) => {
  return Object
    .values(error)
    .join('\n');
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
  errorMessage,
  validationResult
};