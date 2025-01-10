import { useDispatch, useSelector } from 'react-redux';
import { likeSelectedBlog, removeSelectedBlog } from '../reducers/blogReducer';
import { useMatch } from 'react-router-dom';
import Comments from './Comments';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Blog = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogById = (id) => blogs.find((b) => b.id === id);

  const match = useMatch('/blogs/:id');
  const blog = match ? blogById(match.params.id) : null;

  const handleClick = () => {
    dispatch(likeSelectedBlog(blog));
  };

  const handleRemove = () => {
    dispatch(removeSelectedBlog(blog.id));
  };

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div
      data-testid="blog"
      style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
      className="blog"
    >
      <Typography variant="h5" gutterBottom>
        {blog.title}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Url" secondary={blog.url} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Likes" secondary={blog.likes} />
          <Button
            data-testid="likebutton"
            id="likeButton"
            onClick={handleClick}
            variant="contained"
            color="primary"
            style={{ marginLeft: '1rem' }}
          >
            Like
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Author" secondary={blog.author} />
        </ListItem>
        <ListItem>
          <Button
            id="hideButton"
            onClick={handleRemove}
            variant="contained"
            color="secondary"
          >
            Remove
          </Button>
        </ListItem>
      </List>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
