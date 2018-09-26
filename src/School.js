import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { _updateSchool, saveSchool, getSchool, deleteSchool } from './store'

class School extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDeleteSchool = this.handleDeleteSchool.bind(this)
  }

  componentDidMount() {
    this.props.getSchool(this.props.id)
  }

  componentDidUpdate() {
    if (this.props.school.id && !this.state.loaded){
      this.setState({
        loaded: true,
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    const school = {...this.props.school,
      [event.target.name]: event.target.value
    }
    this.props.handleChange(school)
  }

  handleSave() {
    this.props.handleSave(this.props.school)
  }

  handleDeleteSchool(){
    this.props.deleteSchool(this.props.school)
    this.props.history.push('/')
  }


  render() {
    const { loaded } = this.state
    const { school: { name, address, description, students} } = this.props;

    const {handleChange, handleSave, handleDeleteSchool} = this

    return (
      <Fragment>
        {
          loaded
            ? (
              <div>
                <h3>{name}</h3>
                <div>
                  <form>
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
                  </form>
                </div>
                <div>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleDeleteSchool}>Delete</button>
                </div>
                <div>
                  <h4>Students Enrolled:</h4>
                  <Link to='/students/create'><button>Add Student</button></Link>
                </div>
                <div>
                  {
                    students.map(student => <li key={student.id} >{student.firstName} {student.lastName} <button>X</button></li> )
                  }
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

const mapStateToProps = ({schoolsReducer},{id}) => {
  return {
    school: schoolsReducer.school
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSave: (school) => dispatch(saveSchool(school)),
    getSchool: (id) => dispatch(getSchool(id)),
    handleChange: (school) => dispatch(_updateSchool(school)),
    deleteSchool: (school) => dispatch(deleteSchool(school))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(School)
