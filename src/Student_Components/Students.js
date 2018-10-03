import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Students extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }


  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      this.setState({
        loaded: !this.state.loaded
      })
    }
  }


  render() {
    const { students , schools} = this.props

    return (
      <div>
        <div>
          <h4 >Students</h4>
        </div>
        <Link to='/students/create'><button className='btn btn-success' >Create Student</button></Link>
        <ul className='list-group'>
          {
            students.map(student => {
            const school = schools.filter(school => school.id === student.schoolId)[0]
            return <li key={student.id} className='list-group-item'>
            <Link to={`/students/${student.id}`} key={student.id}>{student.firstName} {student.lastName} - {school ? school.name : "None"}</Link></li>
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
