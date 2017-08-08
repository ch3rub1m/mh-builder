import { takeEvery } from 'redux-saga'
import { put, apply } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { fetchSucceeded, fetchFailed } from 'reducers/fetch'

function * fetchRequested ({ payload: { ssl, server, version, resource, method, payload } }) {
  const uri = `http${ssl ? 's' : ''}://${server}/${version}/${resource}`
  try {
    const response = yield fetch(uri, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const contentType = response.headers.get('content-type')
    const content = contentType.startsWith('application/json') ? yield apply(response, response.json) : yield apply(response, response.text)
    if (!(`${response.status}`.startsWith('2'))) {
      throw new Error(content)
    }
    yield put(fetchSucceeded(resource, content))
  } catch (error) {
    yield put(fetchFailed(resource, error))
  } finally {
  }
}

export function * watchFetchRequested () {
  yield takeEvery('FETCH_REQUESTED', fetchRequested)
}
