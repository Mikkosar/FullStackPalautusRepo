import { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import CurrentUser from './components/CurrentUser';
import CreateBlog from './components/CreateBlog';
import Toggable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    setMessage('logged out successfully');
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  const handleLogin = async (event) => {

    try {
      event.preventDefault();

      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage(`${user.name} logged in`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }

    catch (e) {
      console.log(e.response.data.error);
      setMessage(e.response.data.error);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  const handleNewBlog = (newBlog) => {

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
      })
      .then(
        setMessage('blog added successfully'),
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      )
      .catch((e) => {
        console.log(e.response.data.error);
        setMessage('title or url is missing');
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      })
  }

  const handleLike = (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    blogService
      .update(likedBlog)
      .then(returnedBlog => {
        const index = blogs.findIndex(b => b.id === returnedBlog.id);
        if (index !== -1) {
          const updatedBlogs = [...blogs];
          updatedBlogs[index] = returnedBlog
          setBlogs(updatedBlogs);
        }
      }
      )
      .then(
        setMessage('blog liked'),
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      )
      .catch((e) => {
        console.log(e.response.data.error);
        setMessage('like failed for some reason');
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      })
  }

  const handleDelete = (id) => {

    if (window.confirm('Do you really want to remove this blog?')) {
      blogService
        .deleteBlog(id)
        .then(() => {
          const updatedBlogs = blogs.filter(b => b.id !== id);
          setBlogs(updatedBlogs);
        })
        .then(
          setMessage('blog was removed successfully'),
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        )
        .catch((e) => {
          console.log(e.response.data.error);
          setMessage('blog removal failed');
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        })
    }
  }

  return (
    <>
      <Notification message={message} />
      {!user &&
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      }

      {user &&
        <>
          <h1>Blogs</h1>
          <CurrentUser
            user={user}
            logout={handleLogout}
          />
          <Toggable buttonLabel='Create new Blog'>
            <CreateBlog
              handleNewBlog={handleNewBlog}
            />
          </Toggable>
          <br></br>
          <BlogList
            blogs={blogs}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        </>
      }
    </>
  );
};

export default App;