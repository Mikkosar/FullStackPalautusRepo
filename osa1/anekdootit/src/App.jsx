import { useState } from 'react'

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const most = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)

  const handleChangeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleAnecdoteVote = () => {
    setVotes({...votes, [selected]: votes[selected] + 1})
  }

  return (
    <>
      <h1>Anectode of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p>has {votes[selected]} votes</p>
      <br />
      <button onClick={handleAnecdoteVote}>Vote</button>
      <button onClick={handleChangeAnecdote}>Next Anecdote</button>
      <br/>
      <h1>Anectode with the most votes</h1>
      <p>{anecdotes[most]}</p>
      <p>Votes: {votes[most]}</p>
    </>
  )
}

export default App
