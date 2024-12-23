import { configureStore } from "@reduxjs/toolkit"

import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import notificationReducer from "./notificationReducer"

export const store = () => {
    return configureStore({
        reducer: {
            anecdotes: anecdoteReducer,
            filter: filterReducer,
            notification: notificationReducer
        }
    })
}