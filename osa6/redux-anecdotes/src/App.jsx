import AnectodeForm from './components/AnectodeForm'
import AnecdoteList from './components/AnectodeList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

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