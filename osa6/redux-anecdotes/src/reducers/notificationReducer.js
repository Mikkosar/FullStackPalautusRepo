import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        changeNotification: {
            reducer: (state, action) => {
                return action.payload;
            }
        },
    }
});

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(changeNotification(message));
        setTimeout(() => {
            dispatch(changeNotification(''));
        }, time)
    }
}

export const { changeNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;