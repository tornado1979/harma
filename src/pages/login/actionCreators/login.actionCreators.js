import {
  LOGIN_SUCCESS,
  LOGOUT,
  REQUEST_LOGIN,
} from '../actionTypes'

const requestlogin = () => {
  return {
    payload: '',
    type: REQUEST_LOGIN,
  }
}

const loginSuccess = ({ email, password }) => {
  return {
    payload: {
      email,
      isAuthenticated: true,
      password,
    },
    type: LOGIN_SUCCESS,
  }
}

export const authenticateUser = ({ email, password }) => dispatch => {
  dispatch(requestlogin())

  // dispatch login success with a delay
  setTimeout(() => {
    dispatch(loginSuccess({ email, password }))
  }, 1000)
}

export const logout = () => {
  return {
    payload: {
      isAuthenticated: false,
    },
    type: LOGOUT,
  }
}
