import { takeLatest, fork, put } from 'redux-saga/effects'
import {
  GET_BODY_DATA,
  GET_BODY_DATA_SUCCESS
} from './action'

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function * fetchBodyData (action) {
  sleep(10000)
  yield put({
    type: GET_BODY_DATA_SUCCESS,
    value: 'This is a simple react boilerplate'
  })
}

export function * bodyFlow () {
  yield takeLatest(GET_BODY_DATA, fetchBodyData)
}

export default [fork(bodyFlow)]


