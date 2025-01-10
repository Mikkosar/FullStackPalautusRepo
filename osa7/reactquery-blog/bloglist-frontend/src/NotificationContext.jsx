import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return `${action.payload} logged in`;
    case 'LOGINERR':
      return `${action.payload}`;
    case 'LOGOUT':
      return 'logged out successfully';
    case 'NEWBLOG':
      return 'blog added successfully';
    case 'NEWBLOGERR':
      return 'Title or url is missing';
    case 'LIKE':
      return 'Blog liked';
    case 'LIKEERR':
      return 'Like failed for some reason';
    case 'REMOVE':
      return 'Blog was removed successfully';
    case 'REMOVEERR':
      return 'Blog removal failed';
    case 'NULL':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, NotificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  return (
    <NotificationContext.Provider value={[notification, NotificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
