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
  getErrorMessage, getUserToken
} from "./_helper";

const uploadToCloudinary = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);
  return axios
    .post(CLOUDINARY_API, formData)
    .then(response => response.data.secure_url )
    .catch(() => '');
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

  const imageUrl = (centerData.imageUri !== "") ? await uploadToCloudinary(centerData.imageUri) : centerData.image;
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
      const errorMessage = getErrorMessage(error.response);

      dispatch({
        type: CREATE_CENTERS_ERROR,
        ...errorMessage,
      });
    });
};

const updateCenter = (id, newCenterData) => async (dispatch) => {
  dispatch({
    type: UPDATE_CENTERS_PENDING
  });

  const imageUrl = (newCenterData.imageUri !== "" && newCenterData.imageUri !== undefined) ? await uploadToCloudinary(newCenterData.imageUri) : newCenterData.image;
  const token = await getUserToken();

  axios
    .put(`${API_URL}/centers/${id}`, {
      ...newCenterData,
      facilities: newCenterData.facilities.join(),
      image: imageUrl,
      token
    })
    .then(response => {
      console.log('Got here', response.data);
      dispatch({
        type: UPDATE_CENTERS_SUCCESS,
        newData: response.data.val
      });
    })
    .catch(error => {
      console.log(error.response, '>>>>>>', imageUrl);
      const errorMessage = getErrorMessage(error.response);

      dispatch({
        type: UPDATE_CENTERS_ERROR,
        ...errorMessage
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