import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createSchool } from '../store'

class CreateSchool extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      address: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    this.props.addSchool(this.state)
    this.props.history.push('/schools')
  }


  render() {
    const {handleChange, handleSubmit} = this
    const {name, address, description} = this.state

    return (
      <div>
        <h4>Create School</h4>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className="control-label" for='school-name'>Name: </label>
            <input type='text' id='school-name' name='name' value={name} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <label className="control-label" for='address'>Address: </label>
            <input type='text' id='address' name='address' value={address} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <label className="control-label" for='description'>Description: </label>
            <textarea type='text' id='description' class="form-control" rows="5"  name='description' value={description} onChange={handleChange}/>
          </div>
            <button type='submit button' className='btn btn-primary'>Save</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSchool: (school) => dispatch(createSchool(school))
  }
}


export default connect(null, mapDispatchToProps)(CreateSchool)
