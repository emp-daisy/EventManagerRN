import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authenticationReducer from './authenticationReducer';
import centerReducer from './centerReducer';
import eventReducer from './eventReducer';

const reducers = combineReducers({
  authentication: authenticationReducer,
  center: centerReducer,
  event: eventReducer,
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =  createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// const store = createStore(reducers,  applyMiddleware(thunkMiddleware));

export default store;