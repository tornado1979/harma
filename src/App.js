import React, { Component, Fragment } from 'react'
import { Router } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import './App.scss'
import {
  Header,
  Footer,
  Routes,
} from './components'
import { history } from './helpers/history'

import { isAuthenticated } from './pages/login/selectors'
import { searchData } from './pages/home/actionCreators'

class App extends Component {
  changeHandler = (ev) => {
    const searchString = ev.target.value
    // Search begins on 3rd string
    if (searchString.length > 2 || searchString === '') {
      const {
        findData,
      } = this.props

      // dispatch SEARCH_DATA
      findData(searchString)
    }
  }

  render() {
    const {
      isUserLoggedIn,
    } = this.props

    return (
      <Fragment>
        <Router history={history}>
          <Fragment>
            <Header
              changeHandler={(ev) => this.changeHandler(ev)}
              isUserLoggedIn={isUserLoggedIn}
            />
            <Routes />
          </Fragment>
        </Router>
        <Footer />
      </Fragment>
    )
  }
}

App.propTypes = {
  findData: propTypes.func.isRequired,
  isUserLoggedIn: propTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: isAuthenticated(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  findData: searchData, // dispatch SEARCH_DATA
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
