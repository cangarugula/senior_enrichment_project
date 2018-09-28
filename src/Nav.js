import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Nav = ({students, schools}) => {

  return (
    <div>
      <Link to='/'><button>Home</button></Link>


      <Link to='/students'> <button>Students ({students.length})</button> </Link>


      <Link to='/schools'> <button>Schools ({schools.length})</button> </Link>
    </div>
  )
}

const mapStateToProps = ({studentsReducer, schoolsReducer}) => {
  return {
    students: studentsReducer.students,
    schools: schoolsReducer.schools
  }
}

export default connect(mapStateToProps)(Nav)
