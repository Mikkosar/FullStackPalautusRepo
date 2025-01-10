import { useEffect } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import CurrentUser from './components/CurrentUser';
import CreateBlog from './components/CreateBlog';
import Toggable from './components/Togglable';

import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import Users from './components/Users';
import { getAllUsers } from './reducers/allUserReducer';
import ChosenUser from './components/ChosenUser';
import Blog from './components/Blog';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <Container>
      <Notification />
      {!user && <LoginForm />}

      {user && (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Blog App
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
            </Toolbar>
          </AppBar>
          <CurrentUser user={user} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Toggable buttonLabel="Create new Blog">
                    <CreateBlog />
                  </Toggable>
                  <br />
                  <BlogList />
                </>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<ChosenUser />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default App;
