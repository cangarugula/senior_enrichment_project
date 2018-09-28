import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Students extends Component {


  render() {
    const { students , schools} = this.props
    return (
      <div>
        <h3>Students</h3>
        <ul>
          {
            students.map(student => {
            const school = schools.filter(school => school.id === student.schoolId)[0]
            return <Link to={`/students/${student.id}`} key={student.id}><li key={student.id} >{student.firstName} {student.lastName} - {school ? school.name : "None"}</li></Link>
          })
          }
        </ul>
      </div>
    )
  }

}

const mapStateToProps = ({studentsReducer, schoolsReducer}) => {
  return {
    students: studentsReducer.students,
    schools: schoolsReducer.schools
  }
}

export default connect(mapStateToProps)(Students)
