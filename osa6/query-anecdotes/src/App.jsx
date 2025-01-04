import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, voteAnecdote } from './request';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const App = () => {

  const queryClient = useQueryClient();

  const [notification, notificationDispatch] = useContext(NotificationContext);

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    }
  })

  const handleVote = (anecdote) => {
    console.log('voted anecdote: ' + anecdote.id);
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: 'VOTE', payload: anecdote.content});
    setTimeout(() => {
      notificationDispatch({ type: 'NULL' })
    }, 5000)
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return (
      <div>
        loading data...
      </div>
    );
  }

  if (result.isError) {
    return (
      <div>
        anecdote service not availavble due to problems in server
      </div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
