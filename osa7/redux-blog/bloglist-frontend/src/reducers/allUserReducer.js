import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const allUsersSlice = createSlice({
  name: 'all users',
  initialState: [],
  reducers: {
    setAllUsers: {
      reducer: (state, action) => {
        return action.payload;
      },
    },
  },
});

export const getAllUsers = () => {
  return async (dispatch) => {
    const allUsers = await usersService.getUsers();
    dispatch(setAllUsers(allUsers));
  };
};

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
