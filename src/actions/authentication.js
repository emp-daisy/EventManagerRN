import { AsyncStorage } from "react-native";
import axios from "axios";
import { API_URL, AUTH_TOKEN, ERROR_MESSAGE } from "./_constants";
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  UNAUTH_USER,
  AUTH_USER,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_ERROR,
  LOGOUT_PENDING,
  LOGOUT_DONE
} from "./_types";

// const isUserAuthenticated = async () => {
//   try {
//     const authenticated = await AsyncStorage.getItem(AUTH_TOKEN);
//     if (authenticated !== null) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     return false;
//   }
// };

const addUserToken = async token => {
  await AsyncStorage.setItem(AUTH_TOKEN, token);
  return;
};

const removeUserToken = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN);
  return;
};

const isUserAuthenticated = () => async dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });
  try {
    const authenticated = await AsyncStorage.getItem(AUTH_TOKEN);
    if (authenticated !== null) {
      dispatch({
        type: AUTH_USER
      });
    } else {
      throw "Unauthenticated";
    }
  } catch (error) {
    dispatch({
      type: UNAUTH_USER
    });
  }
};

const login = (email, password) => dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });

  axios
    .post(`${API_URL}/users/login`, {
      email,
      password
    })
    .then(response => {
      addUserToken(response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        email: email
      });
    })
    .catch(error => {
      dispatch({
        type: LOGIN_ERROR,
        message: error.response.data.msg || ERROR_MESSAGE
      });
    });
};

const register = credentials => (dispatch) => {
  const { email, password, confirmPassword, firstName, surname } = credentials;
    dispatch({
      type: REGISTER_PENDING
    });

    axios
      .post(`${API_URL}/users`, {
        email,
        password,
        confirmPassword,
        firstName,
        surname
      })
      .then(_response => {
        dispatch({
          type: REGISTER_SUCCESS,
          message: "Registration successful. CHECk EMAIL TO VERIFY"
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_ERROR,
          message: error.msg || ERROR_MESSAGE
        });
      });
};

const forgottenPassword = email => (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_PENDING
    });

    axios
      .post(`${API_URL}/users/reset`, {
        email
      })
      .then(_response => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: "Check your email to continue"
        });
      })
      .catch(error => {
        dispatch({
          type: FORGOT_PASSWORD_ERROR,
          message: error.msg || ERROR_MESSAGE
        });
      });
};

const logout = () => dispatch => {
  dispatch({ type: LOGOUT_PENDING });

  removeUserToken();
  dispatch({ type: LOGOUT_DONE });
};

export { isUserAuthenticated, login, register, forgottenPassword, logout };
