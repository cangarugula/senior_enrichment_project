import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Schools = ({schools}) => {
  return (
    <div>
      <h3>Schools</h3>
      <ul>
      {
        schools.map( school => <Link key={school.id} to={`/schools/${school.id}`}><li key={school.id} >{school.name} {school.students.length}</li></Link>
        )
      }
      </ul>
    </div>
  )
}

const mapStateToProps = ({schoolsReducer}) => {
  return {
    schools: schoolsReducer.schools
  }
}

export default connect(mapStateToProps)(Schools)
