import {
  CHANGE_ACTIVE_PAGE,
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_FAIL,
} from '../actionTypes'

const initialState = {
  activePage: 1,
  error: '',
  isFetching: false,
  items: [],
  itemsPerPage: 6,
  totalPages: 0,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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
