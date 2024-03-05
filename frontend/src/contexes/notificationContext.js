import React, {useState} from 'react';

export const NotificationContext = React.createContext({
    notification: {},
    notificationText: null,
    success: () => {
    },
    error: () => {
    },
})

const STATES = {
    SUCCESS: 'success',
    ERROR: 'error',
}

export const NotificationProvider = (props) => {
    const [notification, setNotification] = useState(null);
    const [notificationText, setNotificationText] = useState(null);
    const color = notification === STATES.SUCCESS ? 'green' : 'red';
    const success = (text) => {
        window.scroll(0, 0);
        setNotificationText(text);
        setNotification(STATES.SUCCESS);
    }
    const error = (text) => {
        window.scroll(0, 0);
        setNotificationText(text);
        setNotification(STATES.ERROR);
    }
    const clear = () => {
        setNotificationText(null);
        setNotification(null);
    }
    return (
        <NotificationContext.Provider
            value={{
                success, error, clear, notification, notificationText, color
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}