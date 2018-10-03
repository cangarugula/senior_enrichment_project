import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getSchools} from '../store'

class Schools extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }


  componentDidUpdate(prevProps) {
    if(this.props.students !== prevProps.students){
      this.setState({
        loaded: !this.state.loaded
      })
    }
  }

  render() {
    const {schools, students} = this.props
    return (
      <div>
        <h4>Schools</h4>
        <Link to='/schools/create'><button className='btn btn-info btn-md' >Create School</button></Link>
        <ul className='list-group'>
        {
          schools.map( school => {
          const studentCount = students.filter(student => student.schoolId === school.id).length
          return <li key={school.id} className='list-group-item'>
          <Link key={school.id} to={`/schools/${school.id}`}>{school.name} ({studentCount})</Link>
          </li>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getSchools: () => dispatch(getSchools())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools)
