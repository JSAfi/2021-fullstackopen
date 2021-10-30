import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({note}) => {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {note}
      </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <Anecdote note={anecdote.content} />
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
                </div>
                </div>
            )} 
        </div>            
    )
}

export default AnecdoteList