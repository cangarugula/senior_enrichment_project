import React, { Component } from 'react'
import Nav from './Nav'
import store, { getStudents, getSchools } from './store'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Schools from './Schools'
import Students from './Students'
import School from './School'

class Main extends Component {

  componentDidMount() {
    store.dispatch(getSchools())
    store.dispatch(getStudents())
  }

  render(){
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route path='/schools/:id' render={ ({match}) => <School id={match.params.id} />}></Route>
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
