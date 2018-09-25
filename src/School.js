import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSchool } from './store'

class School extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      description: '',
      students: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    if(this.props.school){
      const {school} = this.props

      this.setState({
        name: school.name,
        address: school.address,
        description: school.description,
        students: school.students
      })
    }

  }

  componentDidUpdate(prevProps) {
    if(this.props.school !== prevProps.school){
      const {school} = this.props

      this.setState({
        name: school.name,
        address: school.address,
        description: school.description,
        students: school.students
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

    const {name, address, description, students} = this.state
    const {handleChange, handleSave} = this

    return (
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
    )
  }
}

const mapStateToProps = ({schools},{id}) => {
  return {
    school: schools.filter(school => school.id === id*1)[0],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSchool: (school) => dispatch(updateSchool(school))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(School)
