import { useState } from 'react';

const CreateBlog = ({ handleNewBlog }) => {

  const [newBlog, setNewblog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const handleBlog = (event) => {
    event.preventDefault();
    handleNewBlog(newBlog);
    setNewblog({
      title: '',
      author: '',
      url: ''
    });
  }

  return (
    <>
      <h1>Create new</h1>

      <form onSubmit={handleBlog}>
        <p>Title: <input
          data-testid='blogform_title'
          id='blog_title'
          type='text'
          value={newBlog.title}
          name='Title'
          onChange={({ target }) => setNewblog({ ...newBlog, title: target.value })} />
        </p>
        <p>Author: <input
          data-testid='blogform_author'
          id='blog_author'
          type='text'
          value={newBlog.author}
          name='Author'
          onChange={({ target }) => setNewblog({ ...newBlog, author: target.value })} />
        </p>
        <p>Url: <input
          data-testid='blogform_url'
          id='blog_url'
          type='text'
          value={newBlog.url}
          name='Url'
          onChange={({ target }) => setNewblog({ ...newBlog, url: target.value })} />
        </p>
        <button id='blog_submit' type='submit'>Create</button>
      </form>
    </>
  );
};

export default CreateBlog;