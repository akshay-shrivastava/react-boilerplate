import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import './index.scss'
import App from './App'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore, { history } from './store'

const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
