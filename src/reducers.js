import { combineReducers } from 'redux'
import headerReducer from './Header/reducer'
import bodyReducer from './Body/reducer'

import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  header: headerReducer,
  body: bodyReducer
})
