import React, {useEffect} from 'react';
import { useContext } from 'react';
import {NotificationContext} from "../../contexes/notificationContext";


const NotificationElement = ({notif}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            notif.clear();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div style={{...styles.notificationContainer, backgroundColor: notif.color}}>
            <p>{notif.notificationText}</p>
        </div>
    )
}

const styles = {
    notificationContainer: {
        position: "fixed",
        color: "white",
        padding: "5px",
        borderRadius: "10px",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
    },
}

export const Notification = () => {
    const notif = useContext(NotificationContext);
    return (
        notif.notification !== null && (
            <NotificationElement notif={notif} />
        )
    )
}