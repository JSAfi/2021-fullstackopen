import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { vote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log("Anecdote content is", content)
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))
  }

  const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <Notification note={anecdote.content} />
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App