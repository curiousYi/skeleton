import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware))

export default store

// Set the auth info at start
store.dispatch(whoami()) 