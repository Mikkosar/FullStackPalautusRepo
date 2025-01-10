import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  if (notification === null) {
    return null;
  } else if (notification.includes('logged in')) {
    return <div className="notification">{notification}</div>;
  } else if (notification.includes('logged out')) {
    return <div className="notification">{notification}</div>;
  } else if (notification.includes('invalid username')) {
    return <div className="errorNotification">{notification}</div>;
  } else if (notification.includes('blog added')) {
    return <div className="notification">{notification}</div>;
  } else if (notification.includes('missing')) {
    return <div className="errorNotification">{notification}</div>;
  } else if (notification.includes('liked')) {
    return <div className="notification">{notification}</div>;
  } else if (notification.includes('like failed')) {
    return <div className="errorNotification">{notification}</div>;
  } else if (notification.includes('was removed')) {
    return <div className="notification">{notification}</div>;
  } else if (notification.includes('blog removal')) {
    return <div className="errorNotification">{notification}</div>;
  }
};

export default Notification;
