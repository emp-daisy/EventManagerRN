import {
  UPDATE_CENTERS_ERROR,
  UPDATE_CENTERS_SUCCESS,
  UPDATE_CENTERS_PENDING,
  CREATE_CENTERS_ERROR,
  CREATE_CENTERS_SUCCESS,
  CREATE_CENTERS_PENDING,
  DELETE_CENTERS_ERROR,
  DELETE_CENTERS_SUCCESS,
  DELETE_CENTERS_PENDING,
  GET_SINGLE_CENTERS_ERROR,
  GET_SINGLE_CENTERS_SUCCESS,
  GET_SINGLE_CENTERS_PENDING,
  GET_CENTERS_ERROR,
  GET_CENTERS_SUCCESS,
  GET_CENTERS_PENDING,
  GET_STATES_SUCCESS
} from "../actions/_types";

const defaultState = {
  isLoading: false,
  isCreating: false,
  hasError: false,
  errorMessage: '',
  errorValidation: undefined,
  success: false,
  sucessMessage: '',
  allCenterList: [],
  singleCenter: {
    center: {},
    eventUrl: ''
  },
  paginationMeta: {},
  allStates: []
};

const centerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CENTERS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false
      });
    case GET_CENTERS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        allCenterList: action.centers,
        paginationMeta: action.pagination
      });
    case GET_CENTERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        errorMessage: action.message
      });
    case GET_SINGLE_CENTERS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false
      });
    case GET_SINGLE_CENTERS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        singleCenter: Object.assign({}, state.singleCenter, {
          center: action.data
        })
      });
    case GET_SINGLE_CENTERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        errorMessage: action.message
      });
    case DELETE_CENTERS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false
      });
    case DELETE_CENTERS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        allCenterList: state.allCenterList.filter(el => el.id.toString() !== action.id.toString())
      });
    case DELETE_CENTERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        errorMessage: action.message
      });
    case CREATE_CENTERS_PENDING:
      return Object.assign({}, state, {
        isCreating: true,
        hasError: false,
        errorValidation: undefined
      });
    case CREATE_CENTERS_SUCCESS:
      return Object.assign({}, state, {
        isCreating: false,
        hasError: false
      });
    case CREATE_CENTERS_ERROR:
      return Object.assign({}, state, {
        isCreating: false,
        hasError: true,
        errorMessage: action.message,
        errorValidation: action.validationError
      });
    case UPDATE_CENTERS_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false
      });
    case UPDATE_CENTERS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        allCenterList: state.allCenterList.map((item) => {
          if (item.id === action.newData.id) {
            return Object.assign({}, item, action.newData);
          }
          return item;
        }),
        singleCenter: Object.assign({}, state.singleCenter, {
          center: action.newData
        })
      });
    case UPDATE_CENTERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        errorMessage: action.message
      });
    case GET_STATES_SUCCESS:
    return Object.assign({}, state, {
      isLoading: false,
      hasError: false,
      allStates: action.states,
    });
    default:
      return state;
  }
};

export default centerReducer;