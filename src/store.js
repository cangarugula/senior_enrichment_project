import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// action types


// action creators


// thunks



// reducers
const studentReducer = (state=[], action) => {
  return state
}

const schoolReducer = (state=[], action) => {
  return state
}

const reducer = combineReducers({studentReducer,schoolReducer})


const store = createStore(reducer, applyMiddleware(logger,thunk))


export default store
