import { createStore } from 'redux'
import { reducers } from 'reducers'
import middlewares from 'middlewares'
let store = createStore(reducers, middlewares)

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AppContainer } from 'react-hot-loader'
import App from 'containers/App'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Route path='/' component={Component} />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('reducers', () => {
    store.replaceReducer(require('reducers'))
  })
  module.hot.accept('containers/App', () => { render(App) })
}
