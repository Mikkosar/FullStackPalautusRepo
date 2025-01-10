import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = {
      username,
      password,
    };

    dispatch(loginUser(credentials));
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <h2 data-testid="loginTitle">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Password"
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
