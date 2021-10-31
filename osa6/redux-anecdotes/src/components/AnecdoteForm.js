import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch() 

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log("Anecdote content is", content)
        event.target.anecdote.value = ""
        dispatch(createAnecdote(content))
        dispatch(setNotification(`lisätty anekdootti '${content}'`))
        setTimeout(() => dispatch(clearNotification()), 5000)                        
    }

    return (
        <div>
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

export default AnecdoteForm