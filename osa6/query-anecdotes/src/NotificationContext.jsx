/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return `Anecdote '${action.payload}' voted`;
        case 'NEW' :
            return `New anecdote added successfully`;
        case 'NULL' :
            return '';
        case 'ERROR' :
            return `${action.payload}`
        default:
            return state;
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '');

    return (
        <NotificationContext.Provider value = {[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;