import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import callAPI from './callAPI'

export default applyMiddleware(thunk, callAPI)
