import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import blogService from '../services/blogs';
import NotificationContext from '../NotificationContext';

const CreateBlog = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const [newBlog, setNewblog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      dispatch({ type: 'NEWBLOG' });
      setTimeout(() => {
        dispatch({ type: 'NULL' });
      }, 2000);
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    },
    onError: (error) => {
      dispatch({ type: 'NEWBLOGERR' });
      setTimeout(() => {
        dispatch({ type: 'NULL' });
      }, 2000);
    },
  });

  const handleBlog = (event) => {
    event.preventDefault();
    newBlogMutation.mutate(newBlog);
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
        <p>
          Title:{' '}
          <input
            data-testid="blogform_title"
            id="blog_title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, title: target.value })
            }
          />
        </p>
        <p>
          Author:{' '}
          <input
            data-testid="blogform_author"
            id="blog_author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, author: target.value })
            }
          />
        </p>
        <p>
          Url:{' '}
          <input
            data-testid="blogform_url"
            id="blog_url"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewblog({ ...newBlog, url: target.value })
            }
          />
        </p>
        <button id="blog_submit" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateBlog;
