import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import {
  Header,
  Footer,
  Routes,
} from './components'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Fragment>
            <Header />
            <Routes />
          </Fragment>
        </Router>
        <Footer />
      </Fragment>
    )
  }
}

export default App
