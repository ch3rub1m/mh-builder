import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { reducers, sagas } from 'reducers'
const sagaMiddleware = createSagaMiddleware()
const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware))
const store = createStore(reducers, middlewares)

sagaMiddleware.run(sagas)

export default store
