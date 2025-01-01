import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { voteSelectedAnecdote } from "../reducers/anecdoteReducer";


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const allAnecdotes = useSelector(state => {
        return state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    })

    const vote = (anecdote) => {
        console.log('vote', anecdote.id);
        dispatch(voteSelectedAnecdote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5000));
      }

    return (
        <>
            {allAnecdotes.map(anecdote =>
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