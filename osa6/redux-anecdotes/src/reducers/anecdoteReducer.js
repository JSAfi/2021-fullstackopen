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
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
      data: {
        content,
        id : getId(),
        votes: 0
      }
    }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      console.log('VOTETUS TULI', action.data.id)
      const anecdoteToChange = state.find(n => n.id === action.data.id )
      console.log('ANECDOTE TO CHANGE: ', anecdoteToChange)
      const originalVotes = anecdoteToChange.votes
      const changedAnecdote = {...anecdoteToChange, votes: originalVotes + 1 }
      console.log('CHANGED ANECDOTE: ', changedAnecdote)
      
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : changedAnecdote)
    case 'NEW_ANECDOTE':
      console.log("NEW_ANECDOTE reducer", action.data)
      return [...state, action.data]
    default:
      console.log('default')
      return state
  }
}

export default reducer