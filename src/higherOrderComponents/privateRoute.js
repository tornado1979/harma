import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import {
  Route,
  Redirect,
} from 'react-router-dom'

import { isAuthenticated } from '../pages/login/selectors'

class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component,
      isUserLoggedIn,
      location,
      ...rest
    } = this.props
    if (isUserLoggedIn) {
      return (
        <Route
          {...rest}
          render={(props) => (
            <Component {...props} />
          )}
        />
      )
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />)
  }
}

PrivateRoute.propTypes = {
  isUserLoggedIn: propTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: isAuthenticated(state),
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
