import { useState, useEffect, useContext } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import CurrentUser from './components/CurrentUser';
import CreateBlog from './components/CreateBlog';
import Toggable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';
import NotificationContext from './NotificationContext';
import { useQuery } from '@tanstack/react-query';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [notification, notificationDispatch] = useContext(NotificationContext);

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
  });

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
    notificationDispatch({ type: 'LOGOUT' });
    setTimeout(() => {
      notificationDispatch({ type: 'NULL' });
    }, 2000);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      notificationDispatch({ type: 'LOGIN', payload: user.name });
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' });
      }, 2000);
    } catch (e) {
      console.log(e.response.data.error);
      notificationDispatch({
        type: 'LOGINERR',
        payload: e.response.data.error,
      });
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' });
      }, 2000);
    }
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not availavble due to problems in server</div>;
  }

  const blogs = result.data;

  return (
    <>
      <Notification />
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      {user && (
        <>
          <h1>Blogs</h1>
          <CurrentUser user={user} logout={handleLogout} />
          <Toggable buttonLabel="Create new Blog">
            <CreateBlog />
          </Toggable>
          <br></br>
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  );
};

export default App;
