import { Link, Route, Routes, useMatch } from "react-router-dom";
import AnecdotesList from "./AnecdotesList";
import NewAnecdoteForm from "./NewAnecdoteForm";
import About from "./About";
import Notification from "./Notification";
import { useState } from "react";
import Anecdote from "./Anecdote";

const Menu = () => {

  const [anecdotes, setAnecdotes] = useState([
      {
        content: 'If it hurts, do it more often',
        author: 'Jez Humble',
        info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
        votes: 0,
        id: 1
      },
      {
        content: 'Premature optimization is the root of all evil',
        author: 'Donald Knuth',
        info: 'http://wiki.c2.com/?PrematureOptimization',
        votes: 0,
        id: 2
      }
  ]);

  const [notification, setNotification] = useState('');

  const anecdoteById = (id) => anecdotes.find(a => a.id === id);

  const match = useMatch('/anecdote/:id');
  const chosenAnecdote = match ? anecdoteById(Number(match.params.id)) : null;


  const addNew = (anecdote) => {
      anecdote.id = Math.round(Math.random() * 10000)
      setAnecdotes(anecdotes.concat(anecdote));
      setNotification(`a new anecdote: '${anecdote.content}' created!`)
      setTimeout(() => {
        setNotification('');
      }, 5000)
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  };

  const padding = {
    paddingRight: 5
  }

  return (
      <>
          <div>
              <Link style={padding} to="/">Anecdotes</Link>
              <Link style={padding} to='/createnew'>Create New</Link>
              <Link style={padding} to='/about'>About</Link>
          </div>

          {notification && (
            <Notification notification={notification} />
          )}

          <Routes>
              <Route path="/" element={
                <AnecdotesList anecdotes={anecdotes}/>
              } />
              <Route path="/createnew" element={
                <NewAnecdoteForm addNew={addNew} />
              } />
              <Route path="/about" element={
                <About />
              } />
              <Route path="/anecdote/:id" element={
                <Anecdote anecdote={chosenAnecdote} />
              } />
          </Routes>
      </>
  )
}

export default Menu;