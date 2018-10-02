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
                <h3>{name}</h3>
                <div>
                  <form onSubmit={handleSave}>
                    <div>
                      <label>Name: </label>
                        <input name='name' value={name} onChange={handleChange}/>
                    </div>
                    <div>
                      <label>Address: </label>
                      <input name='address'value={address} onChange={handleChange}/>
                    </div>
                    <div>
                      <label>Description: </label>
                      <textarea name='description' value={description} onChange={handleChange}/>
                    </div>
                    <button id='save' disabled={true} type='submit' >Save</button>
                  </form>
                </div>
                <div>
                  <div >
                    <h5 id='status' hidden={true} >Saved!</h5>
                  </div>
                  <button onClick={() => handleDeleteSchool()}>Delete</button>
                </div>
                <div>
                  <h4>Students Enrolled:</h4>
                  <Link to={`/students/create/${this.props.id}`}><button>Add Student</button></Link>
                </div>
                <div>
                  <ul>
                    {
                      students.map(student => <li key={student.id} >{student.firstName} {student.lastName} <button onClick={()=> handleUnenrollStudent(student)}>Unenroll</button></li> )
                    }
                  </ul>
                </div>
              </div>
            ) : (
              <span> Loading... </span>
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
