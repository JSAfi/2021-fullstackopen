import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combinedReducer = combineReducers({
    anecdotes: reducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    combinedReducer, 
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store