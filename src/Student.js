import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getStudent, _updateStudent, saveStudent, deleteStudent } from './store';


class Student extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getStudent(this.props.id)
  }

  componentDidUpdate() {
    if(this.props.student.id && !this.state.loaded) {
      this.setState({
        loaded: true,
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    const student = {...this.props.student, [event.target.name]: event.target.value}
    this.props.handleChange(student)
    console.log(document.getElementById('save'))
    document.getElementById('save').removeAttribute('disabled')
    console.log(document.getElementById('status'))
  }

  handleSave(event) {
    event.preventDefault()
    const student = {...this.props.student, schoolId: this.props.student.schoolId*1 }
    this.props.saveStudent(student)
    document.getElementById('status').removeAttribute('hidden')
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteStudent(this.props.student)
    this.props.history.push('/students')
  }


  render() {
    const {student, schools} = this.props
    const {loaded} = this.state
    const {handleChange, handleSave, handleDelete} = this

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
                  <select name='schoolId' onChange={handleChange} value={student.schoolId ? student.schoolId : 'null'}>
                    <option value={'null'} >None</option>
                    {
                      schools.map(school => <option key={school.id*1} value={school.id*1} >{school.name}</option>)
                    }
                  </select>
                </div>
                <div>
                  <button onClick={()=> this.props.history.push('/students')}>Back</button>
                  <button id='save' disabled={true} onClick={handleSave}>Save</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
                <div >
                  <h5 id='status' hidden={true} >Saved!</h5>
                </div>
              </form>
            </div>
          ) : (
            <span>Loading student info. Please wait.</span>
          )
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({studentsReducer, schoolsReducer}) => {

  return {
    student: studentsReducer.student,
    schools: schoolsReducer.schools
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudent: (id) => dispatch(getStudent(id)),
    handleChange: (student) => dispatch(_updateStudent(student)),
    saveStudent: (student) => dispatch(saveStudent(student)),
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)
