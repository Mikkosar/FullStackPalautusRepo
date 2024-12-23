import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { changeNotification } from "../reducers/notificationReducer";

const AnectodeForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = () => {
        event.preventDefault();
        const anectode = event.target.anectode.value;
        dispatch(newAnecdote(anectode));
        dispatch(changeNotification('New anecdote added successfully'))
      }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anectode" /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnectodeForm;