import React, { Component, Fragment } from 'react'

import './App.scss'
import {
  Header,
  Main,
  Footer,
} from './components'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Main />
        <Footer />
      </Fragment>
    )
  }
}

export default App
