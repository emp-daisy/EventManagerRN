import {
  API_URL,
  CLOUDINARY_API,
  CLOUDINARY_PRESET
} from "./_constants";
import {
  GET_CENTERS_PENDING,
  GET_CENTERS_SUCCESS,
  GET_CENTERS_ERROR,
  UPDATE_CENTERS_PENDING,
  UPDATE_CENTERS_SUCCESS,
  UPDATE_CENTERS_ERROR,
  CREATE_CENTERS_ERROR,
  CREATE_CENTERS_SUCCESS,
  CREATE_CENTERS_PENDING,
  DELETE_CENTERS_ERROR,
  DELETE_CENTERS_SUCCESS,
  DELETE_CENTERS_PENDING,
  GET_SINGLE_CENTERS_PENDING,
  GET_SINGLE_CENTERS_SUCCESS,
  GET_SINGLE_CENTERS_ERROR,
  GET_STATES_SUCCESS,
  GET_STATES_PENDING,
  GET_STATES_ERROR
} from "./_types";
import axios from "axios";
import {
  errorMessage, getUserToken, validationResult
} from "./_helper";

const uploadToCloudinary = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);

  return axios
    .post(CLOUDINARY_API, formData)
    .then(response => response.data.secure_url )
    .catch((error) => error.response);
};

const getCenters = () => dispatch => {
  dispatch({
    type: GET_CENTERS_PENDING
  });

  axios
    .get(`${API_URL}/centers`)
    .then(response => {
      dispatch({
        type: GET_CENTERS_SUCCESS,
        centers: response.data.val.centers,
        pagination: response.data.val.meta.pagination
      });
    })
    .catch(error => {
      dispatch({
        type: GET_CENTERS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const getSingleCenter = (id) => dispatch => {
  dispatch({
    type: GET_SINGLE_CENTERS_PENDING
  });

  axios
    .get(`${API_URL}/centers/${id}`)
    .then(response => {
      dispatch({
        type: GET_SINGLE_CENTERS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_SINGLE_CENTERS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const createCenter = (centerData) => async dispatch => {
  dispatch({
    type: CREATE_CENTERS_PENDING
  });

  const imageUrl = (centerData.image!=="") ? await uploadToCloudinary(centerData.image) : null;

  console.log('ImageURL***', imageUrl);
  const token = await getUserToken();
  axios
    .post(`${API_URL}/centers`, {
      ...centerData,
      facilities: centerData.facilities.join(),
      image: imageUrl,
      token
    })
    .then(_response => {
      dispatch({
        type: CREATE_CENTERS_SUCCESS,
      });
    })
    .catch(error => {
      let message;
      let validationError;
      if(error.response &&  typeof error.response.data.msg === 'object'){
        message = "Validation failed";
        validationError = validationResult(error.response.data.msg);
      }
      else{
        message = errorMessage(error.response && error.response.data.msg);
      }

      dispatch({
        type: CREATE_CENTERS_ERROR,
        message,
        validationError
      });
    });
};

const updateCenter = (id, newCenterData) => dispatch => {
  dispatch({
    type: UPDATE_CENTERS_PENDING
  });

  const token = await getUserToken();
  axios
    .put(`${API_URL}/centers/${id}`, {
      newCenterData,
      token
    })
    .then(response => {
      dispatch({
        type: UPDATE_CENTERS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: UPDATE_CENTERS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const deleteCenter = (id) => dispatch => {
  dispatch({
    type: DELETE_CENTERS_PENDING
  });

  const token = await getUserToken();
  axios
    .delete(`${API_URL}/centers/${id}`)
    .then(response => {
      dispatch({
        type: DELETE_CENTERS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: DELETE_CENTERS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const getStates = () => dispatch => {
  dispatch({
    type: GET_STATES_PENDING
  });

  axios
    .get(`${API_URL}/states`)
    .then(response => {
      dispatch({
        type: GET_STATES_SUCCESS,
        states: response.data.val
      });
    })
    .catch(() => {
      dispatch({
        type: GET_STATES_ERROR,
      });
    });
};

export {
  getCenters,
  getSingleCenter,
  createCenter,
  deleteCenter,
  updateCenter,
  getStates
};