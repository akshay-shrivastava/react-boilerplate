import { takeLatest, fork } from 'redux-saga/effects'
import { GET_HEADER_TEXT } from './action'

function * fetchHeaderLable (action) {
  yield 'My Sample App'
}

export function * headerFlow () {
  yield takeLatest(GET_HEADER_TEXT, fetchHeaderLable)
}

export default [fork(headerFlow)]

