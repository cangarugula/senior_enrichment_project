import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Schools extends Component {

  render() {
    const {schools, students} = this.props

    return (
      <div>
        <h3>Schools</h3>
        <Link to='/schools/create'><button>Create School</button></Link>
        <ul>
        {
          schools.map( school => {
          const studentCount = students.filter(student => student.schoolId === school.id).length
          return <Link key={school.id} to={`/schools/${school.id}`}><li key={school.id} >{school.name} ({studentCount})</li></Link>
          })
        }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({schoolsReducer, studentsReducer}) => {
  return {
    schools: schoolsReducer.schools,
    students: studentsReducer.students
  }
}

export default connect(mapStateToProps)(Schools)
