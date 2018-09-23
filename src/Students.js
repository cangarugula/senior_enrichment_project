import React from 'react'
import { connect } from 'react-redux'

const Students = ({students}) => {
  return (
    <div>
      <h3>Students</h3>
      <ul>
        {
          students.map(student => <li key={student.id} >{student.firstName} - {student.schoolId ? student.school.name : 'None'}</li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({students}) => {
  return {
    students
  }
}

export default connect(mapStateToProps)(Students)
