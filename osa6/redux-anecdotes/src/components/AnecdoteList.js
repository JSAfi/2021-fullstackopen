import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    const filter = useSelector(filter => filter.filter)

    let filteredAnecdotes 

    if(filter) {
        const containsCaseInsensitive = (find) => find.content.toUpperCase().search(filter.toUpperCase()) > -1
        filteredAnecdotes = anecdotes.filter(containsCaseInsensitive)
    } else {
        filteredAnecdotes = anecdotes
    }
    const sortedAnecdotes = filteredAnecdotes.sort((a,b) => b.votes - a.votes)
    console.log('ANECDOTE: ', sortedAnecdotes)
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <Anecdote note={anecdote.content} />
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        dispatch(vote(anecdote.id))
                        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))                        
                    }}>vote</button>
                </div>
                </div>
            )} 
        </div>            
    )
}

export default AnecdoteList