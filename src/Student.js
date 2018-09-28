import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getStudent, _updateStudent } from './store';


class Student extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getStudent(this.props.id)
  }

  componentDidUpdate() {
    if(this.props.student.id && !this.state.loaded) {
      this.setState({
        loaded: true
      })
    }
  }


  handleChange(event) {
    event.preventDefault()
    const student = {...this.props.student, [event.target.name]: event.target.value }
    this.props.handleChange(student)
  }

  render() {
    const {student, schools} = this.props
    const currentSchool = schools.filter(school => school.id === student.schoolId)[0]
    const {loaded} = this.state
    const {handleChange} = this

    return (
      <Fragment>
        {
          loaded ? (
            <div>
              <h4>{student.firstName} {student.lastName}</h4>
              <form>
                <div>
                  <label>First Name: </label>
                  <input name='firstName' value={student.firstName} onChange={handleChange}/>
                </div>
                <div>
                  <label>Last Name: </label>
                  <input name='lastName' value={student.lastName} onChange={handleChange}/>
                </div>
                <div>
                  <label>GPA: </label>
                  <input name='gpa' value={student.gpa} onChange={handleChange}/>
                </div>
                <div>
                  <label>School: </label>
                  <select name='schoolId' value={currentSchool} onChange={handleChange}>
                    {
                      schools.map(school => <option key={school.id} value={school.id} >{school.name}</option>)
                    }
                  </select>
                </div>
                <div>
                  <button>Save</button>
                  <button>Delete</button>
                </div>
              </form>
            </div>
          ) : (
            <span>Loading...</span>
          )
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({studentsReducer, schoolsReducer}, {id}) => {

  return {
    student: studentsReducer.students.filter(student => student.id === id*1 )[0],
    schools: schoolsReducer.schools
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudent: (id) => dispatch(getStudent(id)),
    handleChange: (student) => dispatch(_updateStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)
