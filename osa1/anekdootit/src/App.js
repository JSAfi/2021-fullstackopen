import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}

const DisplayVotes = (props) => {
  return (
    <div>
      has {props.array[props.index]} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [max, setMax] = useState(0)

  const nextAnecdoteHandler = () => {
    setSelected(getRandomInt(0, anecdotes.length-1))
  }
  const voteButtonHandler = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    const maxValue = Math.max(...copy)    
    const idxMax = copy.indexOf(maxValue)
    setMax(idxMax)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <DisplayVotes array={points} index={selected} />
      <p>
      <Button handleClick = {voteButtonHandler} text = "vote" />
      <Button handleClick = {nextAnecdoteHandler} text = "next anecdote" />
      </p>
      <h1>Anecdote with most votes</h1>
      {anecdotes[max]}
      <DisplayVotes array={points} index={max} />
    </div>
  )
}

export default App
