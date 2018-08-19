import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import propTypes from 'prop-types'

import { authenticateUser } from './actionCreators'
import { history } from '../../helpers/history'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (ev) => {
    // get input id
    const elementId = ev.target.id

    // update local state 'email' & 'password'
    this.setState({
      [elementId]: ev.target.value,
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

    const {
      login,
    } = this.props

    // dispatch REQUST_LOGIN action
    const {
      email,
      password,
    } = this.state

    login({ email, password })
    setTimeout(() => {
      history.push('/')
    }, 1200)
  }

  render() {
    const {
      email,
      password,
    } = this.state

    const { from } = this.props.location.state || { from: { pathname: '/' } } // eslint-disable-line
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" id="email">
               Email address
              <input
                aria-describedby="emailHelp"
                className="form-control"
                id="email"
                onChange={this.handleChange}
                placeholder="Enter email"
                type="email"
                value={email}
              />
            </label>
            <small className="form-text text-muted" id="emailHelp">
              We will never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password" id="password">
              Password
              <input
                className="form-control"
                id="password"
                onChange={this.handleChange}
                placeholder="Password"
                type="password"
                value={password}
              />
            </label>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </main>
    )
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login: authenticateUser,
}, dispatch)

export default connect(null, mapDispatchToProps)(Login)
