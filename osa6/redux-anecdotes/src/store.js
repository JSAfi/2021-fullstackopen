import { combineReducers, createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdoteService'

const combinedReducer = combineReducers({
    anecdotes: reducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(combinedReducer)

export default store