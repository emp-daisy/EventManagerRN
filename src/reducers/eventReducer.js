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
} from "../actions/_types";

const defaultState = {
  isLoading: true,
  isCreating: false,
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
        hasError: false,
        success: false,
      });
    case GET_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        eventList: action.data,
        pagination: action.metadata,
      });
    case GET_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        errorMessage: action.msg
      });
    case GET_USER_EVENTS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false
      });
    case GET_USER_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        eventList: action.event
      });
    case GET_USER_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        errorMessage: action.msg
      });
    case DELETE_EVENTS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false
      });
    case DELETE_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        eventList: state.eventList.filter(el => el.id.toString() !== action.id.toString()),
      });
    case DELETE_EVENTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        errorMessage: action.msg
      });
    case CREATE_EVENTS_PENDING:
      return Object.assign({}, state, {
        isCreating: true,
        hasError: false
      });
    case CREATE_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isCreating: false,
        hasError: false,
      });
    case CREATE_EVENTS_ERROR:
      return Object.assign({}, state, {
        isCreating: false,
        hasError: true,
        errorMessage: action.msg
      });
    case UPDATE_EVENTS_PENDING:
      return Object.assign({}, state, {
        isCreating: true,
        hasError: false
      });
    case UPDATE_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isCreating: false,
        hasError: false,
        eventList: state.eventList.map((item) => {
          return (item.id === action.newData.id) ?
             Object.assign({}, item, action.newData) : item;
        }),
      });
    case UPDATE_EVENTS_ERROR:
      return Object.assign({}, state, {
        isCreating: false,
        hasError: true,
        errorMessage: action.msg
      });
      case RESET_EVENT_STATES:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        success: false,
        isCreating: false,
      });
    default:
      return state;
  }
};

export default eventReducer;