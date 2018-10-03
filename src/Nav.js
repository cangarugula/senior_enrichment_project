import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Nav = ({students, schools}) => {

  return (
    <div className='nav nav-tabs'>
      <li className='nav-item'>
      <Link className='nav-link' to='/'>Home</Link>
      </li>


      <li className='nav-item'>
        <Link className='nav-link' to='/students'>Students ({students.length})</Link>
      </li>


      <li className='nav-item' >
        <Link className='nav-link' to='/schools'>Schools ({schools.length})</Link>
      </li>
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
