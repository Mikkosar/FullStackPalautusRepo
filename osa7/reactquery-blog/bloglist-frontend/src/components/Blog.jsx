import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';

import blogService from '../services/blogs';
import NotificationContext from '../NotificationContext';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      dispatch({ type: 'LIKE' });
      setTimeout(() => {
        dispatch({ type: 'NULL' });
      }, 2000);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      dispatch({ type: 'REMOVE' });
      setTimeout(() => {
        dispatch({ type: 'NULL' });
      }, 2000);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = () => {
    return visible ? 'hide' : 'view';
  };

  const handleClick = () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = () => {
    removeBlogMutation.mutate(blog.id);
  };

  return (
    <div data-testid="blog" style={blogStyle} className="blog">
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <p>
          {blog.title}
          <button id="viewButton" onClick={toggleVisibility}>
            {buttonLabel()}
          </button>
        </p>
        {visible && (
          <>
            <li>Url: {blog.url}</li>
            <li data-testid="likes">
              Likes: {blog.likes}
              <button
                data-testid="likebutton"
                id="likeButton"
                onClick={handleClick}
              >
                Like
              </button>
            </li>
            <li>Author: {blog.author}</li>
            <li>
              <button id="hideButton" onClick={handleRemove}>
                remove
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Blog;
