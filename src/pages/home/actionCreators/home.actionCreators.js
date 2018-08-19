import axios from 'axios'

import {
  CHANGE_ACTIVE_PAGE,
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_FAIL,
} from '../actionTypes'

import {
  DATA_API_ENDPOINT,
} from '../../../constants/constants'

export const changeActivePage = (num) => {
  return {
    payload: num,
    type: CHANGE_ACTIVE_PAGE,
  }
}

export const requestData = () => {
  return {
    payload: {
      isFetching: true,
    },
    type: REQUEST_DATA,
  }
}

export const receiveData = (data) => {
  return {
    payload: {
      data,
      isFetching: false,
    },
    type: RECEIVE_DATA,
  }
}

export const receiveDataError = (error) => (
  {
    payload: {
      error,
      isFetching: false,
    },
    type: RECEIVE_DATA_FAIL,
  }
)

export const fetchData = () => dispatch => {
  dispatch(requestData())

  return axios.get(DATA_API_ENDPOINT)
    .then(response => {
      return response.data
    })
    .then((data) => {
      dispatch(receiveData(data))
    })
    .catch((err) => {
      console.log('error:', err)
      dispatch(receiveDataError(err))
    })
}
