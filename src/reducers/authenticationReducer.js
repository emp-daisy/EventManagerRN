import {
    LOGIN_SUCCESS,
    LOGIN_PENDING,
    LOGIN_ERROR,
    REGISTER_PENDING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGOUT_DONE,
    LOGOUT_PENDING,
    AUTH_USER,
    UNAUTH_USER,
    FORGOT_PASSWORD_PENDING,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
} from "../actions/_types";

const defaultState = {
    isLoggedIn: false,
    email: '',
    isLoading: true,
    isResetLoading: false,
    hasError: false,
    errorMessage: '',
};

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_PENDING:
            return Object.assign({}, state, {
                isLoggedIn: false,
                isLoading: true,
                hasError: false,
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: true,
                email: action.email,
                isLoading: false,
            });
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                isLoggedIn: false,
                isLoading: false,
                hasError: true,
                errorMessage: action.message,
            });
        case AUTH_USER:
            return Object.assign({}, state, {
                isLoggedIn: true,
                isLoading: false,
            });
            case UNAUTH_USER:
            return Object.assign({}, state, {
                isLoggedIn: false,
                isLoading: false,
            });
        case REGISTER_PENDING:
            return Object.assign({}, state, {
                isLoggedIn: true,
                isLoading: true,
                hasError: false,
            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: true,
                isLoading: false,
            });
        case REGISTER_ERROR:
            return Object.assign({}, state, {
                isLoggedIn: false,
                isLoading: false,
                hasError: true,
                errorMessage: action.message,
            });
        case FORGOT_PASSWORD_PENDING:
            return Object.assign({}, state, {
                isLoggedIn: true,
                isLoading: true,
                hasError: false,
            });
        case FORGOT_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: true,
                isLoading: false,
            });
        case FORGOT_PASSWORD_ERROR:
            return Object.assign({}, state, {
                isLoggedIn: false,
                isLoading: false,
                hasError: true,
                errorMessage: action.message,
            });
        case LOGOUT_PENDING:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case LOGOUT_DONE:
            return Object.assign({}, state, {
                isLoggedIn: false,
                email: '',
                isLoading: false,
            });
        default:
            return state;
    }
}

export default authenticationReducer;