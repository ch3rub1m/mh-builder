export default ({ dispatch, getState }) => {
  return (next) => {
    return (action) => {
      const {
        types,
        callAPI,
        shouldCallAPI = () => true,
        payload = {}
      } = action

      if (!types) {
        return next(action)
      }

      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.')
      }

      if (typeof callAPI !== 'function') {
        throw new Error('Expected fetch to be a function.')
      }

      if (!shouldCallAPI(getState())) {
        return
      }

      const [requestType, successType, failureType] = types

      dispatch(Object.assign({}, payload, {
        type: requestType
      }))

      return callAPI().then(
        response => response.json(),
        error => error
      ).then(
        (response) => {
          dispatch(Object.assign({}, payload, {
            response: response,
            type: successType
          }))
        },
        (error) => {
          dispatch(Object.assign({}, payload, {
            error: error,
            type: failureType
          }))
        }
      )
    }
  }
}
