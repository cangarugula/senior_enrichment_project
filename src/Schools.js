import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Schools extends Component {

  render() {
    const {schools} = this.props
    console.log(schools)
    return (
      <div>
        <h3>Schools</h3>
        <Link to='/schools/create'><button>Create School</button></Link>
        <ul>
        {
          schools.map( school => <Link key={school.id} to={`/schools/${school.id}`}><li key={school.id} >{school.name} {school.students.length ? school.students.length : null }</li></Link>
          )
        }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({schoolsReducer}) => {
  return {
    schools: schoolsReducer.schools
  }
}

export default connect(mapStateToProps)(Schools)
