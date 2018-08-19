import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actionTypes'

const initialState = {
  isAuthenticated: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
