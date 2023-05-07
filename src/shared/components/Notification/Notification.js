import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';

import "./style.scss"
function Notification(props)
{

    // if (!document.getElementById("notification_fxxx")) {
    //     document.body.insertAdjacentHTML("beforeend", "<div id='notification_fxxx'></div>")
    // }
    const Notifis = { amount: 0, top: 55, topdefault: 55 };
    const timedef = 2000
    // const { children } = props
    // const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    // const [isHide, setisHide] = useState(0);
    // const popRef = useRef()
    // const [isHovering, setIsHovering] = useState(false);
    // useEffect(() =>
    // {
    //     console.log('====================================');
    //     console.log(Notifis);
    //     console.log('====================================');
    // }, [Notifis]);

    // const timeoutRef = useRef(null);
    // useEffect(() =>
    // {
    //     if (!isHovering) {
    //         setIsClick(isHovering);
    //     }
    //     if (isHover && isHovering) {
    //         setIsClick(isHovering);
    //     }
    // }, [isHovering]);
    // const handleMouseEnter = () =>
    // {
    //     clearTimeout(timeoutRef.current);
    //     setIsHovering(true);
    // };

    // const handleMouseLeave = () =>
    // {
    //     timeoutRef.current = setTimeout(() => setIsHovering(false), 200);
    // };
    const checkAmountNoti = () =>
    {
        Notifis.amount++;
        Notifis.top = Notifis.amount * Notifis.topdefault;
        Notifis.top = Notifis.top <= 0 ? 55 : Notifis.top;
        return Notifis
    }
    const AnimateProcess = () =>
    {

        console.log('====================================');
        console.log(Notifis);
        console.log('====================================');
    }
    const SetTimeoutNoti = (props, item) =>
    {

        setTimeout(() =>
        {
            item.classList.add("hide")
            setTimeout(() =>
            {
                item.remove()
                Notifis.amount--;
                Notifis.amount = Notifis.amount <= 0 ? 0 : Notifis.amount;
                Notifis.top = Notifis.amount * Notifis.topdefault;
                Notifis.top = Notifis.top <= 0 ? 55 : Notifis.top;

                if (props.cb) {
                    props.cb()
                }

            }, 500)

        }, props?.isTimeout ? props?.isTimeout : timedef);
    }
    const SetHideNoti = (props, item) =>
    {

        item.classList.add("hide")
        setTimeout(() =>
        {
            item.remove()
            Notifis.amount--;
            Notifis.amount = Notifis.amount <= 0 ? 0 : Notifis.amount;
            Notifis.top = Notifis.amount * Notifis.topdefault;
            Notifis.top = Notifis.top <= 0 ? 55 : Notifis.top;
            if (props.cb) {
                props.cb()
            }
        }, 500)
    }
    return {
        Notifis: Notifis,
        warnning: (props) =>
        {
            const i = checkAmountNoti();

            document.body.insertAdjacentHTML("beforeend", `<div class='notification_fxxx' id="notification_fxxx${i.amount}" style="top:${i.top}px"></div>`)
            const myDiv = document.getElementById(`notification_fxxx${i.amount}`);
            myDiv.classList.add("show");
            ReactDOM.render(<Notifi  {...props} color={"#FFCD29"} SetHideNoti={() => { SetHideNoti(props, myDiv) }} top={Notifis.top} timedef={timedef} />, myDiv);
            if (props.isAutoHide) {
                SetTimeoutNoti(props, myDiv)
            } else if (props.ishide) {
                SetHideNoti(props, myDiv)
            }

        },
        primary: (props) =>
        {
            const i = checkAmountNoti();

            document.body.insertAdjacentHTML("beforeend", `<div class='notification_fxxx' id="notification_fxxx${i.amount}" style="top:${i.top}px"></div>`)
            const myDiv = document.getElementById(`notification_fxxx${i.amount}`);
            myDiv.classList.add("show");
            ReactDOM.render(<Notifi  {...props} color={"#3078F1"} SetHideNoti={() => { SetHideNoti(props, myDiv) }} top={Notifis.top} timedef={timedef} />, myDiv);
            if (props.isAutoHide) {
                SetTimeoutNoti(props, myDiv)
            } else if (props.ishide) {
                SetHideNoti(props, myDiv)
            }


        },
        success: (props) =>
        {

            const i = checkAmountNoti();

            document.body.insertAdjacentHTML("beforeend", `<div class='notification_fxxx' id="notification_fxxx${i.amount}" style="top:${i.top}px"></div>`)
            const myDiv = document.getElementById(`notification_fxxx${i.amount}`);
            myDiv.classList.add("show");
            ReactDOM.render(<Notifi  {...props} color={"#138300"} SetHideNoti={() => { SetHideNoti(props, myDiv) }} top={Notifis.top} timedef={timedef} />, myDiv);

            if (props.isAutoHide) {
                SetTimeoutNoti(props, myDiv)
            } else if (props.ishide) {
                SetHideNoti(props, myDiv)
            }
        }
    }
}
function NotificationWrrap(props)
{
    const { isTimeout, timedef } = props
    const [Process, setProcess] = useState(0);
    const [timeperocess, setTimeperocess] = useState(0);
    useEffect(() =>
    {

        let timeinterval = 100;
        let timemer = isTimeout ? isTimeout : timedef;
        let percentPerMi = timeinterval / (timemer / timeinterval);
        // console.log('====================================');
        // console.log(percentPerMi);
        // console.log('====================================');
        let per = 100;
        // timeperocess = ;
        setTimeperocess(setInterval(() =>
        {
            if (per <= 0) {
                clearInterval(timeperocess)
            }


            per -= percentPerMi;
            if (per <= 0) {
                per = 0
            }
            setProcess(per)
        }, timeinterval));
        return clearInterval(timeperocess)
    }, []);

    const clearProcess = () =>
    {
        clearInterval(timeperocess)
    }
    return (<div className={`notification`} id='notification' >
        <div className='boder_noti' style={{ borderBottom: `4px solid ${props?.color}`, width: Process + "%" }}></div>
        {props.children}
    </div>)
}
function Notifi(props)
{
    const { SetHideNoti } = props
    return (
        <NotificationWrrap {...props}>
            <div className={`notification-warning notification_item`} id='notification-warning' >
                {props.icon && <div className='icon_no'>{props.icon}</div>}
                {!props.icon && <div className='icon_no'><img src='images/ic_question.svg' className='icon_' /> </div>}
                {props.content && <div className='content_no'>{props.content}</div>}
                {props.action && <div className='action_no'>{props.action}</div>}
                <div className='action_close'><button className='reset_btn' onClick={SetHideNoti}><img src='images/ic_close_mini.svg' className='icon_' style={{
                    width: "16px", height: "16px"
                }} /> </button></div>
            </div>
        </NotificationWrrap >
    )
}

export default Notification();