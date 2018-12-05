import {
  API_URL
} from "./_constants";
import {
  GET_EVENTS_PENDING,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  UPDATE_EVENTS_PENDING,
  UPDATE_EVENTS_SUCCESS,
  UPDATE_EVENTS_ERROR,
  CREATE_EVENTS_ERROR,
  CREATE_EVENTS_SUCCESS,
  CREATE_EVENTS_PENDING,
  DELETE_EVENTS_ERROR,
  DELETE_EVENTS_SUCCESS,
  DELETE_EVENTS_PENDING,
  GET_USER_EVENTS_PENDING,
  GET_USER_EVENTS_SUCCESS,
  GET_USER_EVENTS_ERROR
} from "./_types";
import axios from "axios";
import {
  errorMessage
} from "./_helper";

const getEvents = () => dispatch => {
  dispatch({
    type: GET_EVENTS_PENDING
  });

  axios
    .get(`${API_URL}/events`)
    .then(response => {
      dispatch({
        type: GET_EVENTS_SUCCESS,
        email: email
      });
    })
    .catch(error => {
      dispatch({
        type: GET_EVENTS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const getUserEvent = (id) => dispatch => {
  dispatch({
    type: GET_USER_EVENTS_PENDING
  });

  axios
    .get(`${API_URL}/events/${id}`)
    .then(response => {
      dispatch({
        type: GET_USER_EVENTS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USER_EVENTS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const createEvent = (eventData) => dispatch => {
  dispatch({
    type: CREATE_EVENTS_PENDING
  });

  axios
    .post(`${API_URL}/events`, {
      eventData
    })
    .then(response => {
      dispatch({
        type: CREATE_EVENTS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: CREATE_EVENTS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const updateEvent = (id, newEventData) => dispatch => {
  dispatch({
    type: UPDATE_EVENTS_PENDING
  });

  axios
    .put(`${API_URL}/events/${id}`, {
      newEventData
    })
    .then(response => {
      dispatch({
        type: UPDATE_EVENTS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: UPDATE_EVENTS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

const deleteEvent = (id) => dispatch => {
  dispatch({
    type: DELETE_EVENTS_PENDING
  });

  axios
    .delete(`${API_URL}/events/${id}`)
    .then(response => {
      dispatch({
        type: DELETE_EVENTS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: DELETE_EVENTS_ERROR,
        message: errorMessage(error.response && error.response.data.msg)
      });
    });
};

export {
  getEvents,
  getUserEvent,
  createEvent,
  deleteEvent,
  updateEvent
};