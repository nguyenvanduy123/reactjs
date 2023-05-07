import React, { useState, useEffect, useRef } from 'react';
import EventRegister from 'utils/EventRegister';
import "./style.scss"

function TestNoti(props)
{


    const [message, setmessage] = useState("");
    const [type, settype] = useState("");
    const [visible, setvisible] = useState("");
    const [eventListener, seteventListener] = useState("");
    useEffect(() =>
    {

        seteventListener(EventRegister.addEventListener('notification', handleNotification));
        return () =>
        {
            EventRegister.removeEventListener(this.eventListener);
        };
    }, []);

    const handleNotification = (event, data) =>
    {
        setmessage(data.message)
        settype(data.type)
        setvisible(true)


        setTimeout(() =>
        {
            setvisible(false);
        }, 3000);
    }
    return visible ? (
        <div className={`notification notification-${type}`}>
            {message}
        </div>
    ) : null;
}


export default TestNoti;