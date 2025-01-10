const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <>
      <h2 data-testid="loginTitle">Login</h2>
      <form onSubmit={handleLogin}>
        <p>
          username:
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          Password:
          <input
            data-testid="password"
            type="text"
            value={password}
            name="Username"
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
