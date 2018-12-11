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
  GET_USER_EVENTS_ERROR,
  RESET_EVENT_STATES
} from "./_types";
import axios from "axios";
import {
  getErrorMessage, getUserToken
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
      const errorMessage = getErrorMessage(error.response);
      dispatch({
        type: GET_EVENTS_ERROR,
        message: errorMessage
      });
    });
};

const getUserEvent = () => async dispatch => {
  dispatch({
    type: GET_USER_EVENTS_PENDING
  });
  const token = await getUserToken();

  axios
    .get(`${API_URL}/events`, {
      params: {
        token
      }
    })
    .then(response => {
      dispatch({
        type: GET_USER_EVENTS_SUCCESS,
        event: response.data.val.events,
        pagination: response.data.val.meta.pagination
      });
    })
    .catch(error => {
      const errorMessage = getErrorMessage(error.response);
      dispatch({
        type: GET_USER_EVENTS_ERROR,
        message: errorMessage
      });
    });
};

const createEvent = (eventData) => async dispatch => {
  dispatch({
    type: CREATE_EVENTS_PENDING
  });

  const token = await getUserToken();
  axios
    .post(`${API_URL}/events`, {
      ...eventData,
      token
    })
    .then(_response => {
      dispatch({
        type: CREATE_EVENTS_SUCCESS,
      });
    })
    .catch(error => {
      const errorMessage = getErrorMessage(error.response);
      dispatch({
        type: CREATE_EVENTS_ERROR,
        message: errorMessage
      });
    });
};

const updateEvent = (id, newEventData) =>  async dispatch => {
  dispatch({
    type: UPDATE_EVENTS_PENDING
  });

  const token = await getUserToken();
  axios
    .put(`${API_URL}/events/${id}`, {
      ...newEventData,
      token
    })
    .then(response => {
      dispatch({
        type: UPDATE_EVENTS_SUCCESS,
        newData: response.data.val
      });
    })
    .catch(error => {
      console.log(error, '>>>>', error.response);
      const errorMessage = getErrorMessage(error.response);
      dispatch({
        type: UPDATE_EVENTS_ERROR,
        message: errorMessage
      });
    });
};

const deleteEvent = (id) => async dispatch => {
  dispatch({
    type: DELETE_EVENTS_PENDING
  });

  const token = await getUserToken();
  axios
    .delete(`${API_URL}/events/${id}`, {
      data: {token}
    })
    .then(response => {
      dispatch({
        type: DELETE_EVENTS_SUCCESS,
        id
      });
    })
    .catch(error => {
      const errorMessage = getErrorMessage(error.response);
      dispatch({
        type: DELETE_EVENTS_ERROR,
        message: errorMessage
      });
    });
};

const resetEventStore = () => dispatch => {
  dispatch({
    type: RESET_EVENT_STATES
  });
}

export {
  getEvents,
  getUserEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  resetEventStore
};