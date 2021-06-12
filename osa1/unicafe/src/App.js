import React, {useState} from 'react'

const StatisticsLine = (props) => {
  return (
      <tr>
        <td>
          {props.text}
        </td> 
        <td>
          {props.value}
        </td>
      </tr>
  )
}
const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good+neutral+bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticsLine text = "good" value={good} />
          <StatisticsLine text = "neutral" value={neutral} />
          <StatisticsLine text = "bad" value={bad} />
          <StatisticsLine text = "all" value={good+neutral+bad} />
          <StatisticsLine text = "average" value={(good-bad)/(good+neutral+bad)} />      
          <StatisticsLine text = "positive" value={(good)/(good+neutral+bad)} />
        </tbody>
      </table>
    </div>
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
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}
export default App