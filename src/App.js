import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'

import './App.css'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'

// Replace your code here

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses/:id" component={CourseItemDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
