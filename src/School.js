import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateSchool, getSchool } from './store'

class School extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
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
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSave() {
    const school = {...this.state, id: this.props.id*1}
    this.props.saveSchool(school)
  }


  render() {
    const { loaded } = this.state
    const { school: { name, address, description, students} } = this.props;
    const {handleChange, handleSave} = this

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
                  <button>Delete</button>
                </div>
                <h4>Students Enrolled:</h4>
                <div>
                  {
                    students.map(student => <li key={student.id} >{student.firstName} {student.lastName} <button>X</button></li> )
                  }
                </div>
              </div>
            ) : (
              <span> Not loaded yet... </span>
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
    saveSchool: (school) => dispatch(updateSchool(school)),
    getSchool: (id) => dispatch(getSchool(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(School)
