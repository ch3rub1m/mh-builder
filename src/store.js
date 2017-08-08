import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { reducers } from 'reducers'
const sagaMiddleware = createSagaMiddleware()
const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware))
const store = createStore(reducers, middlewares)

import rootSaga from 'sagas'
sagaMiddleware.run(rootSaga)

export default store
