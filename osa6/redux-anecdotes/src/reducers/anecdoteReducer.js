import { createSlice } from "@reduxjs/toolkit"
import anecdotes from "../../services/anecdotes";

//const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote: {
      reducer: (state, action) => {
        state.push(action.payload);
      }
    },
    voteAnecdote: {
      reducer: (state, action) => {
        const id = action.payload.id;
        const anecdoteToVote = state.find(a => a.id === id);
        const votedAnectode = {
          ...anecdoteToVote,
          votes: anecdoteToVote.votes + 1
        }
        return state.map(a => a.id !== id ? a : votedAnectode)
      },
    },
    setAnecdotes: {
      reducer: (state, action) => {
        return action.payload;
      }
    }
  }
});

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const allAnecdotes = await anecdotes.getAll();
    dispatch(setAnecdotes(allAnecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdotes.newAnecdote(content);
    dispatch(appendAnecdote(createdAnecdote));
  }
}

export const voteSelectedAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnectode = await anecdotes.voteAnecdote(anecdote);
    dispatch(voteAnecdote(votedAnectode));
  }
}

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;