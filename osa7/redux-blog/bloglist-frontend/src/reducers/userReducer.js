import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: {
      reducer: (state, action) => {
        return action.payload;
      },
    },
    clearUser: {
      reducer: (state, action) => {
        return null;
      },
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification(`${user.name} loggen in`, 5000));
    } catch (error) {
      dispatch(setNotification('Invalid username or password', 5000));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(clearUser());
    window.localStorage.clear();
    dispatch(setNotification('logged out successfully', 5000));
  };
};

export default userSlice.reducer;
