import { takeLatest, fork, put, call } from 'redux-saga/effects'
import { GET_BODY_DATA, GET_BODY_DATA_SUCCESS } from './action'
import axios from 'axios'

function* fetchBodyData(action) {
  try {
    const response = yield call(() => axios.get('/'), {
      params: {
        results: 1,
        inc: 'name,email,picture'
      }
    })
    console.log('response', response.data)
    yield put({
      type: GET_BODY_DATA_SUCCESS,
      value: 'This is a simple react boilerplate'
    })
  } catch (error) {
    console.error(error)
  }
}

export function* bodyFlow() {
  yield takeLatest(GET_BODY_DATA, fetchBodyData)
}

export default [fork(bodyFlow)]
