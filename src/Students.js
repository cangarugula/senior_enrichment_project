import React, {Component} from 'react'
import { connect } from 'react-redux'

class Students extends Component {

  componentDidUpdate(prevProps) {
    if(this.props.students !== prevProps.students){
      console.log('students did update')

    }

  }

  render() {
    const { students } = this.props
    return (
      <div>
        <h3>Students</h3>
        <ul>
          {
            students.map(student => <li key={student.id} >{student.firstName} - {student.schoolId ? student.school.name : 'None'}</li>)
          }
        </ul>
      </div>
    )
  }

}

const mapStateToProps = ({studentsReducer}) => {
  return {
    students: studentsReducer.students
  }
}

export default connect(mapStateToProps)(Students)
