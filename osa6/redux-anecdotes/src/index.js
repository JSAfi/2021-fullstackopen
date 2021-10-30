import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const importedStore = store

ReactDOM.render(
  <Provider store={importedStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)