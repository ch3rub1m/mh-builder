import {} from 'normalize.css/normalize.css'
import {} from 'skeleton-css-webpack/css/skeleton.css'

import { createStore } from 'redux'
import { reducers } from 'reducers'
import middlewares from 'middlewares'
let store = createStore(reducers, middlewares)

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from 'containers/App'

render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
