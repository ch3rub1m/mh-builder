import store from './store'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { AppContainer } from 'react-hot-loader'
import App from 'containers/App'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
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
