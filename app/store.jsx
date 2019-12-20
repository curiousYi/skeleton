import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

export default createStore(rootReducer, applyMiddleware(logger, thunkMiddleware))