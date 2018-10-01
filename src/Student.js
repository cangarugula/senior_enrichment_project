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

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.setState({
        loaded: !this.state.loaded,
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    const student = {...this.props.student, [event.target.name]: event.target.value}
    this.props.handleChange(student)
    document.getElementById('status').setAttribute('hidden',true)
    document.getElementById('save').removeAttribute('disabled')
  }

  handleSave(event) {
    event.preventDefault()

    const update = {...this.props.student}
    if(update.schoolId === ''){
      update.schoolId = null
    } else {
      update.schoolId = update.schoolId * 1
    }
    this.props.saveStudent(update)
    document.getElementById('status').removeAttribute('hidden')
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteStudent(this.props.student)
    this.props.history.push('/students')
  }


  render() {
    const {student, schools} = this.props
    const {handleChange, handleSave, handleDelete} = this

    return (
      <Fragment>
        {
          student.id ? (
            <div>
              <h4>{student.firstName} {student.lastName}</h4>
              <form onSubmit={handleSave}>
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
                    <option value={''} >None</option>
                    {
                      schools.map(school => <option key={school.id*1} value={school.id*1} >{school.name}</option>)
                    }
                  </select>
                </div>

                <div>
                  <button id='save' disabled={true} type='submit'>Save</button>
                </div>
                </form>
                <div >
                  <h5 id='status' hidden={true} >Saved!</h5>
                </div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={()=> this.props.history.push('/students')}>Back</button>
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
