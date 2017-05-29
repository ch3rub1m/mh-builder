import { SERVER_URI } from 'const'
import fetch from 'isomorphic-fetch'

const LOAD_RESOURCE_REQUEST = 'LOAD_RESOURCE_REQUEST'
const LOAD_RESOURCE_SUCCESS = 'LOAD_RESOURCE_SUCCESS'
const LOAD_RESOURCE_FAILURE = 'LOAD_RESOURCE_FAILURE'

export const loadResource = (resource, version = '', server = SERVER_URI) => {
  return {
    types: [LOAD_RESOURCE_REQUEST, LOAD_RESOURCE_SUCCESS, LOAD_RESOURCE_FAILURE],
    shouldCallAPI: (state) => !state[resource],
    callAPI: () => fetch(`${server}/${version}/${resource}`),
    payload: {
      server,
      version,
      resource
    }
  }
}

import { normalize } from 'normalizr'
import { schemas } from './../schema'

export const loadResourceReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_RESOURCE_REQUEST:
      return state
    case LOAD_RESOURCE_SUCCESS:
      return {
        ...state,
        [action.resource]: normalize(action.response, [schemas[action.resource]])
      }
    case LOAD_RESOURCE_FAILURE:
      return state
    default:
      return state
  }
}
