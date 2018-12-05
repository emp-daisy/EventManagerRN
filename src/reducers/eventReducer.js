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
} from "../actions/_types";

const defaultState = {
  isLoading: true,
  hasError: false,
  errorMessage: '',
  success: false,
  sucessMessage: '',
  eventList: [],
  pagination: []
};

const eventReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_EVENTS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
        success: false,
      });
    case GET_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
        eventList: action.data,
        pagination: action.metadata,
      });
    case GET_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
    case GET_USER_EVENTS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        error: false
      });
    case GET_USER_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
        eventList: action.data
      });
    case GET_USER_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
    case DELETE_EVENTS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        error: false
      });
    case DELETE_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
        // eventList: state.eventList.filter(el => el.id.toString() !== action.id.toString()),
      });
    case DELETE_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
    case CREATE_EVENTS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        error: false
      });
    case CREATE_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
        eventList: [...state.eventList, action.newData],
      });
    case CREATE_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
    case UPDATE_EVENTS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        error: false
      });
    case UPDATE_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
        eventList: Object.assign({}, state.eventList, {
          centers: state.eventList.centers.map((item) => {
            if (item.id === action.newData.id) {
              return Object.assign({}, item, action.newData);
            }
            return item;
          })
        })
      });
    case UPDATE_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
    default:
      return state;
  }
};

export default eventReducer;