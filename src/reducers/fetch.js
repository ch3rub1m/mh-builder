import { createActions, handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import { schemas } from 'schema'
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
  FETCH_SUCCEEDED: (resource, data) => ({ resource, data }),
  FETCH_FAILED: (resource, error) => ({ resource, error })
})

export default handleActions({
  [fetchRequested]: (state, { payload: { ssl, server, version, resource, method, payload } }) => {
    return state
  },
  [fetchSucceeded]: (state, { payload: { resource, data } }) => {
    return {
      ...state,
      [resource]: normalize(data, [schemas[resource]])
    }
  },
  [fetchFailed]: (state, { payload: { data } }) => {
    return state
  }
}, {})
