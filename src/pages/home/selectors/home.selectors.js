import { createSelector } from 'reselect'

// get localstate
const getLocalState = state => {
  return state.data
}

// get all items
export const getItems = createSelector(
  getLocalState,
  data => {
    return data || {}
  },
)

// get data by  activePage, itemsPerPage
export const getItemsByPageNumber = createSelector(
  ({ activePage, itemsPerPage }) => {
    return { activePage, itemsPerPage }
  },
  ({ activePage, itemsPerPage }, state) => getItems(state),
  ({ activePage, itemsPerPage }, data) => {
    const from = activePage === 1 ? 0 : ((activePage - 1) * itemsPerPage)
    const to = (from + itemsPerPage)
    return {
      ...data,
      items: data.items.slice(from, to),
    }
  },
)

// get item by id
export const getItemById = createSelector(
  (itemId) => itemId,
  (itemId, state) => getItems(state),
  (itemId, data) => {
    const itemArr = data.items.filter(item => item.id === Number(itemId))
    return itemArr.length === 0 ? null : itemArr[0]
  },
)
