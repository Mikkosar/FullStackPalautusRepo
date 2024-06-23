import {useState} from "react"

const Statistics = ({good, neutral, bad}) => {

  const total = () => good + neutral + bad
  const average = () => total ? (good - bad) / total() : 0
  const positive = () => `${good / total() * 100 || 0} %`

  if (total() === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  else {
    return (
      <>
      <table>
          <StatisticsLine value={good} text="Good"/>
          <StatisticsLine value={neutral} text="Neutral" />
          <StatisticsLine value={bad} text="bad"/>
          <StatisticsLine value={total()} text="All" />
          <StatisticsLine value={average()} text="Average" />
          <StatisticsLine value={positive()} text="Positive" />
      </table>
      </>
    )
  }
}

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatisticsLine = ({value, text}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}



function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
