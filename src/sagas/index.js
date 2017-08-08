import { all } from 'redux-saga/effects'
import { watchFetchRequested } from './fetchRequested'

export default function * rootSaga () {
  yield all([
    watchFetchRequested()
  ])
}
