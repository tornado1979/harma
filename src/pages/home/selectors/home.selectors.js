import { createSelector } from 'reselect'

const getLocalState = state => state.data

export const getItems = createSelector(
  getLocalState,
  data => data,
)
