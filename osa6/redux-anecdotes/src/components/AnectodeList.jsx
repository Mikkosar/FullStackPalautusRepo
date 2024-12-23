import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        return state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    })

    const vote = (anecdote) => {
        console.log('vote', anecdote.id);
        dispatch(voteAnecdote(anecdote.id));
        dispatch(changeNotification(`You voted '${anecdote.content}'`));
      }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList;