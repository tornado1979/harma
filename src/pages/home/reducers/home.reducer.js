import {
  CHANGE_ACTIVE_PAGE,
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_FAIL,
  SEARCH_DATA,
} from '../actionTypes'

const initialState = {
  activePage: 1,
  error: '',
  immuteData: [], // loads at first and serve for the searching
  isFetching: false,
  items: [],
  itemsPerPage: 8,
  totalPages: 0,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return {
        ...state,
        items: [...action.payload.data],
        totalPages: action.payload.totalPages,
      }
    case CHANGE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      }
    case REQUEST_DATA:
      return {
        ...state,
        isFetching: action.payload.isFetching,
      }
    case RECEIVE_DATA: {
      const numberofItems = action.payload.data.length
      const totalPages = Math.ceil(numberofItems / state.itemsPerPage)

      return {
        ...state,
        immuteData: [...action.payload.data],
        isFetching: action.payload.isFetching,
        items: [...action.payload.data],
        totalPages,
      }
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
