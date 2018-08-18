import {
  REQUEST_DATA,
  RECEIVE_INITIAL_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_FAIL,
} from '../actionTypes/home.actionTypes'

const initialState = {
  activePage: 0,
  error: '',
  isFetching: false,
  items: [],
  totalPages: 0,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        isFetching: action.payload.isFetching,
      }
    case RECEIVE_INITIAL_DATA:
      return {
        ...state,
        items: [...action.payload.data],
        totalPages: action.payload.totalPages,
      }
    case RECEIVE_DATA:
      return {
        ...action.payload,
        items: {
          activePage: action.payload.activePage,
          displayData: [...action.payload.data.displayData],
          isFetching: action.payload.isFetching,
        },
      }
    case RECEIVE_DATA_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isFetching: action.payload.isFetching,
      }
    default:
      return state
  }
}
