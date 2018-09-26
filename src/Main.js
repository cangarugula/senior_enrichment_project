import React, { Component } from 'react'
import Nav from './Nav'
import store, { initialLoad, getStudents, getSchools } from './store'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Schools from './Schools'
import Students from './Students'
import School from './School'
import CreateSchool from './CreateSchool'

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
              <Route path='/schools/:id' render={ ({match, history}) => <School id={match.params.id} history={history} />}></Route>
              <Route path='/schools' render={ ()=>  <Schools /> }></Route>
              <Route path='/students' render={ ()=>  <Students /> }></Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default Main
