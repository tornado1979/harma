import React from 'react'

import {
  Route,
  Redirect,
} from 'react-router-dom'

const fakeAuth = {
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  isAuthenticated: false,
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      fakeAuth.isAuthenticated ? (<Component {...props} />
      ) : (<Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
      ))
    }
  />
)
