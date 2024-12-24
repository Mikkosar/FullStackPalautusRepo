import { useDispatch } from 'react-redux'
import AnectodeForm from './components/AnectodeForm'
import AnecdoteList from './components/AnectodeList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { initializeAnecdote } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdote());
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList  />
      <AnectodeForm />
    </div>
  )
}

export default App