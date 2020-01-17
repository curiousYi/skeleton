import { combineReducers } from 'redux'

const initialState = {}

const rootReducer = combineReducers({
  auth: require('./auth').default,
});