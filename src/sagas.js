import { all } from 'redux-saga/effects'
import headerSaga from './Header/saga'
import bodySaga from './Body/saga'

function * saga () {
  yield all([
    ...headerSaga,
    ...bodySaga
  ])
}

export default saga
