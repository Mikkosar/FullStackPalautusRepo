import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const newAnecdote = async (content) => {
    const object = { content: content, votes: 0 };
    const response = await axios.post(baseUrl, object);
    return response.data;
}

const voteAnecdote = async (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote);
    console.log("anecdote: " + response.data.content);
    return response.data;
}
export default { getAll, newAnecdote, voteAnecdote };