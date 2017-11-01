import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import sagaMiddleware from 'redux-saga'
import root from './rootReducer'

const middleWare = [sagaMiddleware]
const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  middleWare.push(createLogger())
}

const store = createStore(
  root,
  isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default applyMiddleware(...middleWare)(store)