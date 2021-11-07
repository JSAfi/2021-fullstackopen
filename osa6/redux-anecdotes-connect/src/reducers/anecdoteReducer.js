import anecdoteService from "../services/anecdoteService"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (id) => {
  console.log('vote', id)
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const votedAnecdote = anecdotes.find(n => n.id === id )
    console.log('VOTED ANECDOTE:  ', votedAnecdote)
    const originalVotes = votedAnecdote.votes
    const changedAnecdote = {...votedAnecdote, votes: originalVotes + 1 }
    console.log('CHANGED ANECDOTE:  ', changedAnecdote)
    const response = await anecdoteService.update(changedAnecdote.id, changedAnecdote)
    console.log('GOT RESPONSE', response)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote,
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }  
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      console.log("VOTE reducer action", action)
      console.log('VOTE id', action.data.id)
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data) 
    case 'NEW_ANECDOTE':
      console.log("NEW_ANECDOTE reducer", action)
      return [...state, action.data]
    default:
      console.log('default')
      return state
  }
}

export default reducer