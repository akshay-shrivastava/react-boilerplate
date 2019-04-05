import { createStore, compose, applyMiddleware } from 'redux'
import CreateSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import reducers from './reducers'
import sagas from './sagas'
import { default as reduxActionMiddleware } from './socket'

export const history = createBrowserHistory()

const configureStore = () => {
  const sagaMiddleware = CreateSagaMiddleware()
  let middleware = applyMiddleware(
    reduxActionMiddleware,
    routerMiddleware(history),
    sagaMiddleware
  )
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-underscore-dangle
    const devToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION__ || window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(
        middleware,
        devToolsExtension()
      )
    }
  }
  const store = createStore(reducers(history), middleware)
  sagaMiddleware.run(sagas)
  return store
}

export default configureStore
