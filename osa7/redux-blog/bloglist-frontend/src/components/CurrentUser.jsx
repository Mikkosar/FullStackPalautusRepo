import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import { Button, Typography } from '@mui/material';

const CurrentUser = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Typography
        style={{ paddingTop: 10, paddingBottom: 10 }}
        variant="body1"
        data-testid="currentuser"
      >
        {user.name} logged in{' '}
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Typography>
    </>
  );
};

CurrentUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CurrentUser;
