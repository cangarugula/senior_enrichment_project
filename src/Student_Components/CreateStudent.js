import React, {Component} from 'react'
import { connect } from 'react-redux'
import {createStudent} from '../store'


class CreateStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: props.schoolId || 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const student = {...this.state, schoolId: this.state.schoolId*1}
    this.props.handleSubmit(student)
    this.props.history.push('/students')
  }

  render() {
    const {schools} = this.props
    const {firstName, lastName, gpa, schoolId} = this.state
    const {handleChange, handleSubmit} = this

    return (
      <div>
        <h4>Create Student</h4>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label for='firstName'>First Name: </label>
            <input type='text' id='firstName' name='firstName' value={firstName} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <label for='lastName'>Last Name: </label>
            <input type='text' id='lastName' name='lastName' value={lastName} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <label for='gpa'>GPA: </label>
            <input maxLength='4' type='text' id='gpa' name='gpa' value={gpa} onChange={handleChange}/>
          </div>
          <div className='dropdown'>
            <label>School: </label>
            <select name='schoolId' value={schoolId} onChange={handleChange}>
            <option>----</option>
            {
              schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
            }
            </select>
          </div>
            <button type='submit button' className='btn btn-primary'>Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({schoolsReducer}) => {
  return {
    schools: schoolsReducer.schools
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (student) => dispatch(createStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)
