import React, {useState} from 'react'

const Display = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}


const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
  }

  return(
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick = {handleGoodClick} text="good" />
        <Button handleClick = {handleNeutralClick} text="neutral" />
        <Button handleClick = {handleBadClick} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Display text = "good" value={good} />
        <Display text = "neutral" value={neutral} />
        <Display text = "bad" value={bad} />
        <Display text = "all" value={good+neutral+bad} />
        <Display text = "average" value={(good-bad)/(good+neutral+bad)} />
        <Display text = "positive" value={(good)/(good+neutral+bad)} />
      </div>
    </div>
  )
}
export default App