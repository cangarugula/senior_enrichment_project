import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Nav = ({students, schools}) => {

  return (
    <div className='btn-group-justified'>
      <Link to='/'><button className='btn-group-justified' className='btn btn-primary'>Home</button></Link>


      <Link to='/students'> <button className='btn-group-justified' className='btn btn-success'>Students ({students.length})</button> </Link>


      <Link to='/schools'> <button className='btn-group-justified' className='btn btn-info' >Schools ({schools.length})</button> </Link>
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
