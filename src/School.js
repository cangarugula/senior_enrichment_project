import React, { Component } from 'react'
import { connect } from 'react-redux'

class School extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if(this.props.school){
      const {school} = this.props
      this.setState({
        name: school.name,
        address: school.address,
        description: school.description
      })
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.school !== prevProps.school){
      const {school} = this.props

      this.setState({
        name: school.name,
        address: school.address,
        description: school.description
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {

  }


  render() {

    const {name, address, description} = this.state
    const {handleChange, handleSubmit} = this
    console.log(this.state)
    return (
      <div>
        <h3>{name}</h3>
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
    )
  }
}

const mapStateToProps = ({schools},{id}) => {

  return {
    school: schools.filter(school => school.id === id*1)[0]
  }
}


export default connect(mapStateToProps)(School)
