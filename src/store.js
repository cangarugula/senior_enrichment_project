import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// school action types
const GET_SCHOOLS = 'GET_SCHOOLS'
const GET_SCHOOL = 'GET_SCHOOL'
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'
const DELETE_SCHOOL = 'DELETE_SCHOOL'

// student action types
const GET_STUDENTS = 'GET_STUDENTS'

// action creators

const _getStudents = (students) => ({ type: GET_STUDENTS, students })
const _getSchools = (schools) => ({ type: GET_SCHOOLS, schools })

const _getSchool = (school) => ({ type: GET_SCHOOL, school })

const _updateSchool = (school) => ({ type: UPDATE_SCHOOL, school })

const _deleteSchool = (school) => ({ type: DELETE_SCHOOL, school})

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

export const getSchool = (id) => {
  return (dispatch) => {
    axios.get(`/api/schools/${id}`)
      .then(response => dispatch(_getSchool(response.data)))
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

export const deleteSchool = (school) => {
  return (dispatch) => {
    axios.delete(`/api/schools/${school.id}`)
      .then(() => dispatch(_deleteSchool(school)))
  }
}


// reducers

const studentInitialState = {
  students: [],
  student: {}
}

const studentsReducer = (state=studentInitialState, action) => {
  switch(action.type) {
    case GET_STUDENTS:
      return {...state, students: action.students}
    default:
      return state
  }
}

const schoolInitialState = {
  schools: [],
  school: {}
}

const schoolsReducer = (state=schoolInitialState, action) => {
  switch(action.type) {
    case GET_SCHOOLS:
      return {...state, schools: action.schools }
    case UPDATE_SCHOOL:
      const filter = state.schools.filter(school => school.id !== action.school.id)
      return {...state, schools: [...filter, action.school] }
    case GET_SCHOOL:
      return {...state, school: action.school}
    default:
      return state
  }
}

const reducer = combineReducers({studentsReducer, schoolsReducer })


const store = createStore(reducer, applyMiddleware(logger,thunk))


export default store
