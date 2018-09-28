import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// school action types
const GET_SCHOOLS = 'GET_SCHOOLS'
const GET_SCHOOL = 'GET_SCHOOL'
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'
const SAVE_SCHOOL = 'SAVE_SCHOOL'
const DELETE_SCHOOL = 'DELETE_SCHOOL'
const CREATE_SCHOOL = 'CREATE_SCHOOL'

// student action types
const GET_STUDENTS = 'GET_STUDENTS'
const GET_STUDENT = 'GET_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'

//  student action creators

const _getStudents = (students) => ({ type: GET_STUDENTS, students })

const _getStudent = (student) => ({ type: GET_STUDENT, student })

export const _updateStudent = (student) => ({ type: UPDATE_STUDENT, student })


// school action creators

const _getSchools = (schools) => ({ type: GET_SCHOOLS, schools })

const _getSchool = (school) => ({ type: GET_SCHOOL, school })

export const _updateSchool = (school) => ({ type: UPDATE_SCHOOL, school })

const _saveSchool = (school) => ({ type: SAVE_SCHOOL, school })

const _deleteSchool = (school) => ({ type: DELETE_SCHOOL, school})

const _createSchool = (school) => ({ type: CREATE_SCHOOL, school })

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

// student thunks

export const getStudents = () => {
  return (dispatch) => {
    axios.get('/api/students')
      .then(response => dispatch(_getStudents(response.data)))
  }
}

export const getStudent = (id) => {
  return (dispatch) => {
    axios.get(`/api/students/${id}`)
      .then(response => dispatch(_getStudent(response.data)))
  }
}


// school thunks

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

export const saveSchool = (school) => {
  return (dispatch) => {
    axios.put(`/api/schools/${school.id}`, school)
      .then((response) => dispatch(_saveSchool(response.data)))
  }
}

export const deleteSchool = (school) => {
  return (dispatch) => {
    axios.delete(`/api/schools/${school.id}`)
      .then(() => dispatch(_deleteSchool(school)))
  }
}

export const createSchool = (school) => {
  return (dispatch) => {
    axios.post('/api/schools',school)
      .then(response => dispatch(_createSchool(response.data)))
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
    case GET_STUDENT:
      return {...state, student: action.student}
    case UPDATE_STUDENT:
      return {...state, student: action.student}
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
      return {...state, school: action.school }
    case GET_SCHOOL:
      return {...state, school: action.school}
    case SAVE_SCHOOL:
      const filtered = state.schools.filter(school => school.id !== action.school.id)
      return {...state, schools: [...filtered, action.school]}
    case DELETE_SCHOOL:
      const schools = state.schools.filter(school => school.id !== action.school.id)
      return {...state, schools}
    case CREATE_SCHOOL:
      console.log([...state.schools, action.school])
      return {...state, schools: [...state.schools, action.school]}
    default:
      return state
  }
}

const reducer = combineReducers({studentsReducer, schoolsReducer })


const store = createStore(reducer, applyMiddleware(logger,thunk))


export default store
