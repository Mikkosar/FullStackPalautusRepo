import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { TextField, Button } from '@mui/material';

const CreateBlog = () => {
  const [newBlog, setNewblog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const dispatch = useDispatch();

  const handleBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog(newBlog));
    setNewblog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <>
      <h1>Create new</h1>

      <form onSubmit={handleBlog}>
        <div>
          <TextField
            label="Title"
            data-testid="blogform_title"
            id="blog_title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, title: target.value })
            }
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Author"
            data-testid="blogform_author"
            id="blog_author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, author: target.value })
            }
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Url"
            data-testid="blogform_url"
            id="blog_url"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, url: target.value })
            }
            fullWidth
            margin="normal"
          />
        </div>
        <Button
          id="blog_submit"
          type="submit"
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateBlog;
