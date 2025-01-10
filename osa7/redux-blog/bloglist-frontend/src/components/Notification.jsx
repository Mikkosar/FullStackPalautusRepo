import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (message === null) {
    return null;
  } else if (message.includes('logged in')) {
    return <Alert severity="success">{message}</Alert>;
  } else if (message.includes('logged out')) {
    return <Alert severity="success">{message}</Alert>;
  } else if (message.includes('invalid username')) {
    return <Alert severity="error">{message}</Alert>;
  } else if (message.includes('blog added')) {
    return <Alert severity="success">{message}</Alert>;
  } else if (message.includes('missing')) {
    return <Alert severity="error">{message}</Alert>;
  } else if (message.includes('liked')) {
    return <Alert severity="success">{message}</Alert>;
  } else if (message.includes('like failed')) {
    return <Alert severity="error">{message}</Alert>;
  } else if (message.includes('was removed')) {
    return <Alert severity="success">{message}</Alert>;
  } else if (message.includes('blog removal')) {
    return <Alert severity="error">{message}</Alert>;
  }
};

export default Notification;
