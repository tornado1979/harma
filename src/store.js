import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux'

import thunk from 'redux-thunk'

import {
  reducer as homeReducer,
} from './pages/home/reducers'

import {
  reducer as userReducer,
} from './pages/login/reducers'


import actionsLogMiddleware from './middlewares/actionsLogger'

const middlewares = [thunk]
const enhancers = []

if (process.env.NODE_ENV === 'development') {
  // extract devTools from windows
  const {
    devToolsExtension,
  } = window

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension()) // enable devTools
  }

  middlewares.push(actionsLogMiddleware) // enable logger middleware
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
)

const rootReducers = combineReducers({
  data: homeReducer,
  user: userReducer,
})

const store = createStore(
  rootReducers,
  composedEnhancers,
)

export default store
