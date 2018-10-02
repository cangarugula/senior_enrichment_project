import React, { Component } from 'react'
import Nav from './Nav'
import store, { initialLoad } from './store'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Schools from './School_Components/Schools'
import Students from './Student_Components/Students'
import School from './School_Components/School'
import CreateSchool from './School_Components/CreateSchool'
import Student from './Student_Components/Student'
import CreateStudent from './Student_Components/CreateStudent'

class Main extends Component {

  componentDidMount() {
    store.dispatch(initialLoad())
  }

  render(){
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Switch>

              <Route exact path='/schools/create' render={ ({history}) => <CreateSchool history={history} /> }></Route>
              <Route exact path='/students/create' render={({history}) => <CreateStudent history={history} />}></Route>
              <Route path='/students/create/:id' render={({history,  match}) => <CreateStudent history={history} schoolId={match.params.id*1} />}></Route>
              <Route path='/students/:id' render={({match, history}) => <Student id={match.params.id*1} history={history}/> }></Route>
              <Route path='/schools/:id' render={ ({match, history}) => <School id={match.params.id*1} history={history} />}></Route>
              <Route exact path='/schools' render={ ()=>  <Schools /> }></Route>
              <Route exact path='/students' render={ ()=>  <Students /> }></Route>

            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default Main
