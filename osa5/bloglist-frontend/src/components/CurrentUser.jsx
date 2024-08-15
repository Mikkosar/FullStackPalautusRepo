import PropTypes from 'prop-types';

const CurrentUser = ({ user, logout }) => {

  return (
    <>
      <p data-testid='currentuser'>{user.name} logged in <button onClick={logout}>logout</button></p>
    </>
  );
};

CurrentUser.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default CurrentUser;