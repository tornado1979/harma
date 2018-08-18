import axios from 'axios'

import {
  REQUEST_DATA,
  RECEIVE_INITIAL_DATA,
  RECEIVE_DATA_FAIL,
} from '../actionTypes'

import {
  ARTICLES_PER_PAGE,
  DATA_API_ENDPOINT,
} from '../../../constants/constants'

export const requestData = () => {
  return {
    payload: {
      isFetching: true,
    },
    type: REQUEST_DATA,
  }
}

export const receiveData = (data) => {
  const numberofItems = data.length
  const totalPages = Math.ceil(numberofItems / ARTICLES_PER_PAGE)

  return {
    payload: {
      data,
      isFetching: false,
      totalPages,
    },
    type: RECEIVE_INITIAL_DATA,
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

export const fetchInitialData = () => dispatch => {
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
