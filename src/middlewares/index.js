import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import callAPI from './callAPI'

export default composeWithDevTools(applyMiddleware(thunk, callAPI))
