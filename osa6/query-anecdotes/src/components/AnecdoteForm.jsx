import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {

  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      dispatch({ type: 'ERROR', payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'NULL' })
      }, 5000)
    }
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: 'NEW' })
    setTimeout(() => {
      dispatch({ type: 'NULL' })
    }, 5000)
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
