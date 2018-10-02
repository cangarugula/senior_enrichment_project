import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { _updateSchool, saveSchool, getSchool, deleteSchool, deleteStudent, saveStudent } from '../store'

class School extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDeleteSchool = this.handleDeleteSchool.bind(this)
    this.handleUnenrollStudent = this.handleUnenrollStudent.bind(this)
  }

  componentDidMount() {
    this.props.getSchool(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      this.setState({
        loaded: !this.state.loaded,
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    const school = {...this.props.school,
      [event.target.name]: event.target.value
    }
    this.props.handleChange(school)
    document.getElementById('status').setAttribute('hidden',true)
    document.getElementById('save').removeAttribute('disabled')

  }

  handleSave(event) {
    event.preventDefault()
    this.props.saveSchool(this.props.school)
    document.getElementById('status').removeAttribute('hidden')
    document.getElementById('save').setAttribute('disabled', true)
  }

  handleDeleteSchool(){
    this.props.deleteSchool(this.props.school)
    this.props.history.push('/')
  }

  handleUnenrollStudent(student) {
    const update = {...student, schoolId: null}
    this.props.saveStudent(update)
    this.setState({
      loaded: !this.state.loaded
    })
  }


  render() {
    const { school: { id, name, address, description} , students } = this.props;

    const {handleChange, handleSave, handleDeleteSchool, handleUnenrollStudent} = this

    return (
      <Fragment>
        {
          id
            ? (
              <div>
                <h4>{name}</h4>
                <div>
                  <form onSubmit={handleSave} >
                    <div className='form-group'>
                      <label className="control-label" for='school-name'>Name: </label>
                        <input type='text' id='school-name' name='name' value={name} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                      <label className="control-label" for='address'>Address: </label>
                      <input id='address' name='address'value={address} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                      <label className="control-label" for='description'>Description: </label>
                      <textarea id='description' name='description' class="form-control" rows="5" value={description} onChange={handleChange}/>
                    </div>
                    <div >
                      <button type='button' className='btn btn-primary' id='save' disabled={true} type='submit' >Save</button>

                      <button type='button' className='btn btn-primary' onClick={()=> this.props.history.push('/students')}>Back</button>

                      <button type='button' className='btn btn-danger btn-sm' onClick={() => handleDeleteSchool()}>Delete</button>

                      <h5 id='status' hidden={true} >Saved!</h5>
                    </div>

                  </form>
                </div>
                <div>
                  <h4>Students Enrolled:</h4>
                  <Link to={`/students/create/${this.props.id}`}><button type='button' className='btn btn-success btn-sm' >Add Student</button></Link>
                </div>
                <div>
                  <ul>
                    {
                      students.map(student => <li key={student.id} >{student.firstName} {student.lastName} <button type='button' className='btn btn-warning btn-sm' onClick={()=> handleUnenrollStudent(student)}>Unenroll</button></li> )
                    }
                  </ul>
                </div>
              </div>
            ) : (
              <span> Loading school info... Please wait. </span>
            )
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({schoolsReducer, studentsReducer},{id}) => {
  return {
    school: schoolsReducer.school,
    students: studentsReducer.students.filter(student => student.schoolId === id*1)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSchool: (school) => dispatch(saveSchool(school)),
    getSchool: (id) => dispatch(getSchool(id)),
    handleChange: (school) => dispatch(_updateSchool(school)),
    deleteSchool: (school) => dispatch(deleteSchool(school)),
    deleteStudent: (student) => dispatch(deleteStudent(student)),
    saveStudent: (student) => dispatch(saveStudent(student))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(School)
