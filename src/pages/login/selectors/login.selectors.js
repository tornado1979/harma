import { createSelector } from 'reselect'

const getLocalState = (state) => state && state.user

export const isAuthenticated = createSelector(
  getLocalState,
  user => user && user.isAuthenticated,
)
