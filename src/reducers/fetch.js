import { createActions, handleActions } from 'redux-actions'
import { put, apply, all, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { normalized } from 'schema'
import { SERVER_URI } from 'const'

export const { fetchRequested, fetchSucceeded, fetchFailed } = createActions({
  FETCH_REQUESTED: ({ ssl = false, server = SERVER_URI, version = '', resource, method = 'GET', payload }) => ({
    ssl,
    server,
    version,
    resource,
    method,
    payload
  }),
  FETCH_SUCCEEDED: (name, data) => ({ name, data }),
  FETCH_FAILED: (name, error) => ({ name, error })
})

function * fetchRequestedSaga ({ payload: { ssl, server, version, resource, method, payload } }) {
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
    const normalizedData = normalized(content, resource)
    const actions = Object.entries(normalizedData.entities).map(([name, data]) => put(fetchSucceeded(name, data)))
    yield all(actions)
  } catch (error) {
    yield put(fetchFailed(resource, error))
  }
}

export function * watchFetchRequestedSaga () {
  yield takeEvery(fetchRequested, fetchRequestedSaga)
}

export default handleActions({
  [fetchSucceeded]: (state, { payload: { name, data } }) => {
    const resource = state[name]
    return {
      ...state,
      [name]: {
        ...resource,
        ...data
      }
    }
  },
  [fetchFailed]: (state, { payload: { name, error } }) => {
    return state
  }
}, {})
