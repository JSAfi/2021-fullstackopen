import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({note}) => {
    return (
      <div>
        {note}
      </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <Anecdote note={anecdote.content} />
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        dispatch(vote(anecdote.id))
                        dispatch(setNotification(`you voted '${anecdote.content}'`))
                        setTimeout(() => dispatch(clearNotification()), 5000)
                        }
                    }>vote</button>
                </div>
                </div>
            )} 
        </div>            
    )
}

export default AnecdoteList