import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import allUsersReducer from './allUserReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    allUsers: allUsersReducer,
  },
});

export default store;
