import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnectodeForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const anectode = event.target.anectode.value;
        event.target.anectode.value = '';
        dispatch(createAnecdote(anectode));
        dispatch(setNotification('New anecdote added successfully', 5000))
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