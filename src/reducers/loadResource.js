import { SERVER_URI } from 'const'
import fetch from 'isomorphic-fetch'

const LOAD_RESOURCE_REQUEST = 'LOAD_RESOURCE_REQUEST'
const LOAD_RESOURCE_SUCCESS = 'LOAD_RESOURCE_SUCCESS'
const LOAD_RESOURCE_FAILURE = 'LOAD_RESOURCE_FAILURE'

export const loadResource = (resource, server = SERVER_URI, version = '') => {
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

export const loadResourceReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_RESOURCE_REQUEST:
      console.log('request')
      return state
    case LOAD_RESOURCE_SUCCESS:
      console.log('success')
      return {
        ...state,
        [action.resource]: action.response
      }
    case LOAD_RESOURCE_FAILURE:
      console.log('failure')
      return state
    default:
      return state
  }
}
