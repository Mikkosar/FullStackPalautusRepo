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
        clearNotification: {
            reducer: () => {
                return initialState;
            }
        }
    }
});

export const { changeNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;