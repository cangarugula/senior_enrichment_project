import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getStudent, _updateStudent, saveStudent, deleteStudent } from '../store';


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
              <h4 id='student_header'>{student.firstName} {student.lastName}</h4>
              <form onSubmit={handleSave}>
                <div className='form-group'>
                  <label for='firstName' >First Name: </label>
                  <input type='text' id='firstName' name='firstName' value={student.firstName} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                  <label for='lastName'>Last Name: </label>
                  <input type='text' id='lastName' name='lastName' value={student.lastName} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                  <label for='gpa'>GPA: </label>
                  <input type='text' id='gpa' name='gpa' value={student.gpa} onChange={handleChange}/>
                </div>
                <div className='dropdown' >
                  <label >School </label>
                  <select name='schoolId' onChange={handleChange} value={student.schoolId ? student.schoolId : 'null'}>
                    <option value={''} >None</option>
                    {
                      schools.map(school => <option key={school.id*1} value={school.id*1} >{school.name}</option>)
                    }
                  </select>
                </div>

                <div>
                  <button type='button' className='btn btn-primary' id='save' disabled={true} type='submit' >Save</button>

                  <button type='button' className='btn btn-primary' onClick={()=> this.props.history.push('/students')}>Back</button>

                  <button type='button' className='btn btn-danger btn-sm' onClick={handleDelete}>Delete</button>

                  <h5 id='status' hidden={true} >Saved!</h5>
                </div>
                </form>
                </div>
          ) : (
            <span>Loading student info... Please wait.</span>
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
