import axios from 'axios'

import {
  CHANGE_ACTIVE_PAGE,
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_FAIL,
  SEARCH_DATA,
} from '../actionTypes'

import {
  DATA_API_ENDPOINT,
} from '../../../constants/constants'

import store from '../../../store'

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

// pass the searchString and get the immuteData array from store
export const searchData = (searchString) => {
  const {
    immuteData,
    itemsPerPage,
  } = store.getState().data

  // search string on the items title
  const searchResults = searchString === '' ? immuteData : immuteData.filter(item => item.title.search(searchString) > -1)
  // compute the 'new' total pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage)

  return {
    payload: {
      data: searchResults,
      totalPages,
    },
    type: SEARCH_DATA,
  }
}
