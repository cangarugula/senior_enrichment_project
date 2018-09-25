import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// action types
const GET_STUDENTS = 'GET_STUDENTS'
const GET_SCHOOLS = 'GET_SCHOOLS'
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'

// action creators

const _getStudents = (students) => ({ type: GET_STUDENTS, students })
const _getSchools = (schools) => ({ type: GET_SCHOOLS, schools })

const _updateSchool = (school) => {
  console.log('hello')
  return { type: UPDATE_SCHOOL, school }
}

// thunks

export const initialLoad = () => {
  return (dispatch) => {
    axios.get('/api/students')
      .then(response => dispatch(_getStudents(response.data)))
      .then(() => {
        axios.get('/api/schools')
          .then(response => dispatch(_getSchools(response.data)))
      })
  }
}

export const getStudents = () => {
  return (dispatch) => {
    axios.get('/api/students')
      .then(response => dispatch(_getStudents(response.data)))
  }
}

export const getSchools = () => {
  return (dispatch) => {
    axios.get('/api/schools')
      .then(response => dispatch(_getSchools(response.data)))
  }
}

export const updateSchool = (school) => {

  return (dispatch) => {
    axios.put(`/api/schools/${school.id}`, school)
      .then((response) => {
        dispatch(_updateSchool(response.data))
      })
  }
}


// reducers
const students = (state=[], action) => {
  switch(action.type) {
    case GET_STUDENTS:
      return state = action.students
    default:
      return state
  }
}

const schools = (state=[], action) => {
  switch(action.type) {
    case GET_SCHOOLS:
      return state = action.schools
    case UPDATE_SCHOOL:
      const filter = state.filter(school => school.id !== action.school.id)
      console.log([...filter, action.school])
      return [...filter, action.school]
    default:
      return state
  }
}

const reducer = combineReducers({students, schools})


const store = createStore(reducer, applyMiddleware(logger,thunk))


export default store
