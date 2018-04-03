// @flow

// Redux Store Configuration
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { serviceReducer } from "../data/store/DataProvider";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import { nav, auth } from '../containers/NavigatorReducer';
import loggingMiddleware from './logging';

const configureStore = (initialState) => {
  const middleware = applyMiddleware(thunk, loggingMiddleware);
  const Reducers = combineReducers({
    serviceReducer,
    nav,
    auth,
  });

  return createStore(Reducers, initialState, middleware);
};

export default configureStore;