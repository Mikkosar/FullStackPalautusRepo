import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CommentSelectedBlog } from '../reducers/blogReducer';
import { TextField, Button } from '@mui/material';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment && comment.length > 3) {
      dispatch(CommentSelectedBlog(id, comment));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Comment"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Comment
        </Button>
      </form>
    </>
  );
};

export default CommentForm;
