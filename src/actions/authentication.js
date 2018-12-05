import axios from "axios";
import {
  API_URL
} from "./_constants";
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
import {
  errorMessage,
  addUserToken,
  removeUserToken,
  getUserToken
} from "./_helper";

const isUserAuthenticated = () => async dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });
  try {
    const authenticated = await getUserToken();
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
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const register = credentials => (dispatch) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    surname
  } = credentials;
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
        message: errorMessage(error.response && error.response.data.msg)
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
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_PENDING
  });

  removeUserToken();
  dispatch({
    type: LOGOUT_DONE
  });
};

export {
  isUserAuthenticated,
  login,
  register,
  forgottenPassword,
  logout
};