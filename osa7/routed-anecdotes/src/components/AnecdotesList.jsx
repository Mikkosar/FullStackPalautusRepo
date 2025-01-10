import { Link } from "react-router-dom";

const AnecdotesList = ({ anecdotes }) => {
    return (
        <>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote => 
                    <li key={anecdote.id} >
                        <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
                    </li>)}
            </ul>
        </>
    )
}

export default AnecdotesList;