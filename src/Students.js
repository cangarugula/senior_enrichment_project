import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getStudents } from './store'

class Students extends Component {

  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.props.getStudents()
    this.setState({
      loaded: true
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.students !== prevProps.students){
      this.setState({
        loaded: !this.state.loaded
      })

    }
  }


  render() {
    const { students , schools} = this.props

    return (
      <div>
        <h3>Students</h3>
        <Link to='/students/create'><button>Add Student</button></Link>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: () => dispatch(getStudents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)
